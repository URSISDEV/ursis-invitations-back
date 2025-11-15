
# URSIS-Invitations — Contexto Técnico para Agentes de IA

Este documento define la arquitectura y reglas del proyecto URSIS-Invitations.
Es obligatorio para cualquier herramienta de IA (Windsurf, Cursor, Replit, etc.) que vaya a generar o modificar código del proyecto.

---

## 🟣 Objetivo del Proyecto

SaaS para crear invitaciones digitales (XV, bodas, cumpleaños, etc.) donde los usuarios:

- Eligen un *template* visual (UI predefinida)
- Completan datos mediante un wizard
- Guardan la invitación en el backend
- Obtienen un link público del tipo:

```
https://invia.com.ar/invitations/xv-santino
```

Los invitados acceden a la invitación pública, renderizada dinámicamente por el **frontend** según el template elegido.

El backend **no maneja estilos**, solo datos.
