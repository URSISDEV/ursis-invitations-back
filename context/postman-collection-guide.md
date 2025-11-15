# 📮 Guía para Actualizar la Colección de Postman

Esta guía explica cómo mantener actualizada la colección de Postman (`postman-collection.json`) cuando se agregan nuevos endpoints o se modifican los existentes.

---

## 🎯 Estructura de la Colección

La colección está organizada en las siguientes secciones principales:

### 1. **🔧 Environment Setup**
- Health checks para desarrollo y producción
- Endpoints para verificar conectividad

### 2. **🏠 General**
- Endpoints básicos (health, root)
- Funcionalidades generales del sistema

### 3. **💌 Invitations**
- **📋 CRUD Operations**: Crear, leer, actualizar, eliminar invitaciones
- **🔍 Search & Public Access**: Búsqueda por slug e invitaciones públicas
- **⚙️ Management Operations**: Operaciones de gestión (toggle público)
- **❌ Error Tests**: Casos de prueba para errores

### 4. **📝 Whitelist**
- Gestión de usuarios en whitelist
- Autenticación básica
- Rate limiting tests

---

## 🛠️ Cómo Agregar Nuevos Endpoints

### Paso 1: Identificar la Sección Correcta
Determina dónde debe ir el nuevo endpoint:
- **CRUD básico** → `💌 Invitations > 📋 CRUD Operations`
- **Búsqueda/público** → `💌 Invitations > 🔍 Search & Public Access`
- **Gestión/admin** → `💌 Invitations > ⚙️ Management Operations`
- **Casos de error** → `💌 Invitations > ❌ Error Tests`

### Paso 2: Estructura de un Request
```json
{
  "name": "Nombre Descriptivo del Endpoint",
  "request": {
    "method": "GET|POST|PUT|PATCH|DELETE",
    "header": [
      {
        "key": "Content-Type",
        "value": "application/json"
      }
    ],
    "body": {
      "mode": "raw",
      "raw": "{\n  \"campo\": \"valor\"\n}"
    },
    "url": {
      "raw": "{{baseUrl}}/ruta/del/endpoint",
      "host": ["{{baseUrl}}"],
      "path": ["ruta", "del", "endpoint"]
    }
  },
  "response": []
}
```

### Paso 3: Convenciones de Nombres
- **GET**: `Get [Recurso] by [Criterio]`
- **POST**: `Create [Recurso] - [Tipo/Descripción]`
- **PUT**: `Update [Recurso]`
- **PATCH**: `[Acción Específica] [Recurso]`
- **DELETE**: `Delete [Recurso]`
- **Error Tests**: `[Acción] - [Tipo de Error] (Error Test)`

---

## 📝 Variables de la Colección

### Variables Actuales:
```json
{
  "baseUrl": "http://localhost:3269/api",
  "invitationId": "REPLACE_WITH_REAL_ID"
}
```

### Agregar Nueva Variable:
```json
{
  "key": "nombreVariable",
  "value": "valorPorDefecto",
  "type": "string",
  "description": "Descripción de la variable"
}
```

---

## 🎨 Ejemplos de Datos Realistas

### Para Invitaciones XV Años:
```json
{
  "templateId": "xv-romantic",
  "slug": "xv-santino",
  "title": "XV Años de Santino",
  "eventType": "XV Años",
  "eventDate": "2024-12-15",
  "eventTime": "20:00",
  "sectionsData": {
    "hero": {
      "subtitle": "¡Celebremos juntos este momento especial!",
      "backgroundImage": "xv-bg-1.jpg"
    },
    "details": {
      "venue": "Salón Los Jardines",
      "address": "Av. Libertador 1234, Buenos Aires",
      "dressCode": "Elegante Sport"
    },
    "rsvp": {
      "enabled": true,
      "deadline": "2024-12-01",
      "phone": "+54 9 11 1234-5678"
    }
  },
  "isPublic": false
}
```

### Para Bodas:
```json
{
  "templateId": "boda-elegante",
  "slug": "boda-maria-juan",
  "title": "Boda de María y Juan",
  "eventType": "Casamiento",
  "sectionsData": {
    "hero": {
      "coupleNames": "María & Juan",
      "subtitle": "Te invitamos a celebrar nuestro gran día"
    },
    "ceremony": {
      "venue": "Iglesia San José",
      "time": "19:30"
    },
    "reception": {
      "venue": "Hotel Plaza",
      "time": "21:00"
    }
  }
}
```

### Para Cumpleaños:
```json
{
  "templateId": "cumple-divertido",
  "slug": "cumple-ana-30",
  "title": "Cumpleaños de Ana - 30 años",
  "eventType": "Cumpleaños",
  "sectionsData": {
    "hero": {
      "age": 30,
      "theme": "Años 90"
    },
    "party": {
      "activities": ["DJ", "Karaoke", "Juegos retro"]
    }
  }
}
```

---

## 🔄 Proceso de Actualización

### 1. **Cuando se agrega un nuevo endpoint:**
```bash
# 1. Identificar el módulo y funcionalidad
# 2. Abrir postman-collection.json
# 3. Localizar la sección correcta
# 4. Agregar el nuevo request siguiendo la estructura
# 5. Usar variables {{baseUrl}} y {{invitationId}} cuando corresponda
# 6. Incluir ejemplos realistas en el body
# 7. Guardar y probar
```

### 2. **Cuando se modifica un endpoint existente:**
```bash
# 1. Buscar el request por nombre
# 2. Actualizar method, URL, headers o body según corresponda
# 3. Actualizar el nombre si cambió la funcionalidad
# 4. Verificar que las variables sigan siendo válidas
```

### 3. **Cuando se agrega un nuevo módulo:**
```bash
# 1. Crear nueva sección principal en "item"
# 2. Usar emoji descriptivo en el nombre
# 3. Crear subsecciones si es necesario
# 4. Agregar variables específicas del módulo
# 5. Actualizar la descripción de la colección
```

---

## 🧪 Testing y Validación

### Checklist antes de commitear:
- [ ] Todos los endpoints usan variables `{{baseUrl}}`
- [ ] Los IDs usan variables como `{{invitationId}}`
- [ ] Los nombres siguen las convenciones establecidas
- [ ] Los ejemplos de datos son realistas y completos
- [ ] Se incluyen casos de error cuando corresponde
- [ ] La estructura JSON es válida
- [ ] Se actualizó la versión en `info.version`

### Comandos útiles:
```bash
# Validar JSON
cat postman-collection.json | jq .

# Buscar endpoints específicos
grep -n "\"name\":" postman-collection.json

# Contar endpoints
grep -c "\"method\":" postman-collection.json
```

---

## 📋 Templates de Requests Comunes

### GET con parámetro:
```json
{
  "name": "Get Resource by ID",
  "request": {
    "method": "GET",
    "header": [],
    "url": {
      "raw": "{{baseUrl}}/resource/{{resourceId}}",
      "host": ["{{baseUrl}}"],
      "path": ["resource", "{{resourceId}}"]
    }
  },
  "response": []
}
```

### POST con body:
```json
{
  "name": "Create Resource",
  "request": {
    "method": "POST",
    "header": [
      {
        "key": "Content-Type",
        "value": "application/json"
      }
    ],
    "body": {
      "mode": "raw",
      "raw": "{\n  \"field\": \"value\"\n}"
    },
    "url": {
      "raw": "{{baseUrl}}/resource",
      "host": ["{{baseUrl}}"],
      "path": ["resource"]
    }
  },
  "response": []
}
```

### Error Test:
```json
{
  "name": "Action - Error Type (Error Test)",
  "request": {
    "method": "GET",
    "header": [],
    "url": {
      "raw": "{{baseUrl}}/resource/invalid-id",
      "host": ["{{baseUrl}}"],
      "path": ["resource", "invalid-id"]
    }
  },
  "response": []
}
```

---

## 🚀 Mejores Prácticas

1. **Organización**: Mantén los endpoints agrupados lógicamente
2. **Nombres descriptivos**: Usa nombres que expliquen claramente la funcionalidad
3. **Variables**: Siempre usa variables para URLs base e IDs
4. **Ejemplos realistas**: Incluye datos que reflejen casos de uso reales
5. **Casos de error**: Agrega tests para validar manejo de errores
6. **Documentación**: Actualiza esta guía cuando agregues nuevos patrones
7. **Versionado**: Incrementa la versión en `info.version` con cambios significativos

---

## 📞 Contacto y Soporte

Para dudas sobre la estructura de la colección o nuevos endpoints, consultar:
- Documentación del proyecto en `/context/project-context.md`
- Código fuente de los controladores en `/src/modules/`
- Esta guía para patrones y convenciones
