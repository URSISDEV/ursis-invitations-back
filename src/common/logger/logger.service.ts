import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
          return `${timestamp} [${level.toUpperCase()}] ${context ? `[${context}]` : ''} ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
        })
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error'
        }),
        new winston.transports.File({
          filename: 'logs/combined.log'
        }),
        new winston.transports.File({
          filename: 'logs/users.log',
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        })
      ]
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }

  // Métodos específicos para eventos de usuario
  logUserRegistration(userData: { name: string; email: string; isEventOrganizer: boolean; ip?: string }) {
    this.logger.info('New user registered in whitelist', {
      context: 'UserRegistration',
      event: 'WHITELIST_REGISTRATION',
      user: {
        name: userData.name,
        email: userData.email,
        isEventOrganizer: userData.isEventOrganizer
      },
      ip: userData.ip,
      timestamp: new Date().toISOString()
    });
  }

  logAuthAttempt(success: boolean, ip?: string, userAgent?: string) {
    this.logger.info(`Authentication attempt: ${success ? 'SUCCESS' : 'FAILED'}`, {
      context: 'Authentication',
      event: 'AUTH_ATTEMPT',
      success,
      ip,
      userAgent,
      timestamp: new Date().toISOString()
    });
  }

  logInvitationCreated(invitationData: { title: string; eventType: string; isPublic: boolean }) {
    this.logger.info('New invitation created', {
      context: 'InvitationCreation',
      event: 'INVITATION_CREATED',
      invitation: {
        title: invitationData.title,
        eventType: invitationData.eventType,
        isPublic: invitationData.isPublic
      },
      timestamp: new Date().toISOString()
    });
  }

  logRateLimitViolation(data: { ip: string; userAgent: string; endpoint: string; method: string }) {
    this.logger.warn('Rate limit violation detected', {
      context: 'RateLimit',
      event: 'RATE_LIMIT_EXCEEDED',
      violation: {
        ip: data.ip,
        userAgent: data.userAgent,
        endpoint: data.endpoint,
        method: data.method
      },
      timestamp: new Date().toISOString()
    });
  }
}
