# 📮 API Endpoints - Módulo de Invitaciones

Documentación completa de todos los endpoints disponibles para el módulo de invitaciones del backend URSIS.

---

## 🌐 Base URL

```
Desarrollo: http://localhost:3269/api
Producción: https://ursis.com.ar/invia/api
```

---

## 📋 Endpoints Disponibles

### **1. Listar Todas las Invitaciones**

```http
GET /invitations
```

**Descripción:** Obtiene todas las invitaciones del sistema.

**Headers:** Ninguno requerido

**Respuesta:**
```json
[
  {
    "id": "uuid-123",
    "templateId": "xv-romantic",
    "slug": "xv-santino",
    "title": "XV Años de Santino",
    "eventDate": "2024-12-15",
    "eventTime": "20:00",
    "eventType": "XV Años",
    "sectionsUsed": {
      "hero": "hero_v2",
      "details": "details_v1",
      "gallery": "gallery_v1",
      "rsvp": "rsvp_basic"
    },
    "sectionsOrder": [
      "hero_v2",
      "details_v1", 
      "gallery_v1",
      "rsvp_basic"
    ],
    "sectionsData": {
      "hero": {
        "title": "XV de Santino",
        "subtitle": "¡Celebremos juntos este momento especial!",
        "backgroundImage": "xv-bg-1.jpg"
      },
      "details": {
        "venue": "Salón Los Jardines",
        "address": "Av. Libertador 1234, Buenos Aires",
        "dressCode": "Elegante Sport"
      },
      "gallery": {
        "images": []
      },
      "rsvp": {
        "enabled": true,
        "deadline": "2024-12-01",
        "phone": "+54 9 11 1234-5678"
      }
    },
    "isPublic": false,
    "createdAt": "2024-11-15T19:47:00Z"
  }
]
```

---

### **2. Obtener Invitación por ID**

```http
GET /invitations/:id
```

**Descripción:** Obtiene una invitación específica por su ID (UUID).

**Parámetros:**
- `id` (string, required): UUID de la invitación

**Ejemplo:**
```http
GET /invitations/550e8400-e29b-41d4-a716-446655440000
```

**Respuesta:** Objeto invitación completo (igual estructura que el array anterior)

**Errores:**
- `404 Not Found`: Invitación no encontrada

---

### **3. Obtener Invitación por Slug**

```http
GET /invitations/slug/:slug
```

**Descripción:** Obtiene una invitación por su slug único.

**Parámetros:**
- `slug` (string, required): Slug único de la invitación

**Ejemplo:**
```http
GET /invitations/slug/xv-santino
```

**Respuesta:** Objeto invitación completo

**Errores:**
- `404 Not Found`: Invitación no encontrada

---

### **4. Obtener Invitación Pública por Slug** ⭐

```http
GET /invitations/public/:slug
```

**Descripción:** Obtiene una invitación pública por su slug. **Este es el endpoint principal para renderizar invitaciones públicas.**

**Parámetros:**
- `slug` (string, required): Slug único de la invitación

**Ejemplo:**
```http
GET /invitations/public/xv-santino
```

**Respuesta:** Objeto invitación completo (solo si `isPublic: true`)

**Errores:**
- `404 Not Found`: Invitación no encontrada o no es pública

**💡 Uso en Frontend:**
```javascript
// Para renderizar invitación pública
const response = await fetch(`${API_URL}/invitations/public/${slug}`);
const invitation = await response.json();
```

---

### **5. Crear Nueva Invitación**

```http
POST /invitations
```

**Descripción:** Crea una nueva invitación con el sistema de secciones dinámicas.

**Headers:**
```
Content-Type: application/json
```

**Body (Ejemplo XV Años):**
```json
{
  "templateId": "xv-romantic",
  "slug": "xv-santino",
  "title": "XV Años de Santino",
  "eventType": "XV Años",
  "eventDate": "2024-12-15",
  "eventTime": "20:00",
  "sectionsUsed": {
    "hero": "hero_v2",
    "details": "details_v1",
    "gallery": "gallery_v1",
    "rsvp": "rsvp_basic"
  },
  "sectionsOrder": [
    "hero_v2",
    "details_v1",
    "gallery_v1",
    "rsvp_basic"
  ],
  "sectionsData": {
    "hero": {
      "title": "XV de Santino",
      "subtitle": "¡Celebremos juntos este momento especial!",
      "backgroundImage": "xv-bg-1.jpg"
    },
    "details": {
      "venue": "Salón Los Jardines",
      "address": "Av. Libertador 1234, Buenos Aires",
      "dressCode": "Elegante Sport"
    },
    "gallery": {
      "images": []
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

**Body (Ejemplo Boda):**
```json
{
  "templateId": "boda-elegante",
  "slug": "boda-maria-juan",
  "title": "Boda de María y Juan",
  "eventType": "Casamiento",
  "eventDate": "2024-06-15",
  "eventTime": "19:30",
  "sectionsUsed": {
    "hero": "hero_wedding_v1",
    "ceremony": "ceremony_classic",
    "reception": "reception_elegant",
    "rsvp": "rsvp_formal"
  },
  "sectionsOrder": [
    "hero_wedding_v1",
    "ceremony_classic",
    "reception_elegant",
    "rsvp_formal"
  ],
  "sectionsData": {
    "hero": {
      "title": "Boda de María y Juan",
      "subtitle": "Te invitamos a celebrar nuestro gran día",
      "coupleNames": "María & Juan",
      "backgroundImage": "wedding-bg-1.jpg"
    },
    "ceremony": {
      "venue": "Iglesia San José",
      "address": "Calle Principal 456, Centro",
      "time": "19:30"
    },
    "reception": {
      "venue": "Hotel Plaza",
      "address": "Av. 9 de Julio 789, Buenos Aires",
      "time": "21:00"
    },
    "rsvp": {
      "enabled": true,
      "deadline": "2024-05-15",
      "email": "rsvp@mariajuan.com"
    }
  },
  "isPublic": false
}
```

**Respuesta:** Objeto invitación creado con ID generado

**Errores:**
- `409 Conflict`: Slug ya existe
- `400 Bad Request`: Datos inválidos

---

### **6. Actualizar Invitación**

```http
PUT /invitations/:id
```

**Descripción:** Actualiza una invitación existente. Permite cambiar versiones de secciones y reordenarlas.

**Parámetros:**
- `id` (string, required): UUID de la invitación

**Headers:**
```
Content-Type: application/json
```

**Body (Ejemplo - Cambiar secciones):**
```json
{
  "title": "XV Años de Santino - ACTUALIZADO",
  "eventTime": "20:30",
  "sectionsUsed": {
    "hero": "hero_v3",
    "details": "details_v2",
    "gallery": "gallery_v1",
    "rsvp": "rsvp_advanced"
  },
  "sectionsOrder": [
    "hero_v3",
    "details_v2",
    "gallery_v1",
    "rsvp_advanced"
  ],
  "sectionsData": {
    "hero": {
      "title": "XV de Santino",
      "subtitle": "¡Celebremos juntos este momento especial! - ACTUALIZADO",
      "backgroundImage": "xv-bg-2.jpg"
    },
    "details": {
      "venue": "Salón Los Jardines - Salón Principal",
      "address": "Av. Libertador 1234, Buenos Aires",
      "dressCode": "Elegante Sport",
      "parking": "Estacionamiento gratuito disponible"
    },
    "gallery": {
      "images": ["photo1.jpg", "photo2.jpg"]
    },
    "rsvp": {
      "enabled": true,
      "deadline": "2024-11-25",
      "phone": "+54 9 11 1234-5678",
      "email": "rsvp@xvsantino.com"
    }
  }
}
```

**Respuesta:** Objeto invitación actualizado

**Errores:**
- `404 Not Found`: Invitación no encontrada
- `409 Conflict`: Slug ya existe (si se cambia el slug)

---

### **7. Cambiar Estado Público/Privado**

```http
PATCH /invitations/:id/toggle-public
```

**Descripción:** Cambia el estado público/privado de una invitación.

**Parámetros:**
- `id` (string, required): UUID de la invitación

**Headers:** Ninguno requerido

**Respuesta:** Objeto invitación con `isPublic` actualizado

**Errores:**
- `404 Not Found`: Invitación no encontrada

---

### **8. Eliminar Invitación**

```http
DELETE /invitations/:id
```

**Descripción:** Elimina una invitación permanentemente.

**Parámetros:**
- `id` (string, required): UUID de la invitación

**Respuesta:** `204 No Content` (sin body)

**Errores:**
- `404 Not Found`: Invitación no encontrada

---

## 🎨 Estructura de Datos

### **Campos Principales**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único |
| `templateId` | string | ID del template base (ej: "xv-romantic") |
| `slug` | string | URL slug único (ej: "xv-santino") |
| `title` | string | Título de la invitación |
| `eventDate` | date | Fecha del evento (YYYY-MM-DD) |
| `eventTime` | time | Hora del evento (HH:mm) |
| `eventType` | string | Tipo de evento (ej: "XV Años", "Casamiento") |
| `sectionsUsed` | object | Qué versión de cada sección usar |
| `sectionsOrder` | array | Orden de renderizado de las secciones |
| `sectionsData` | object | Datos de cada sección |
| `isPublic` | boolean | Si la invitación es pública |
| `createdAt` | timestamp | Fecha de creación |

### **sectionsUsed - Ejemplos**

```json
// XV Años
{
  "hero": "hero_v2",
  "details": "details_v1",
  "gallery": "gallery_v1",
  "rsvp": "rsvp_basic"
}

// Boda
{
  "hero": "hero_wedding_v1",
  "ceremony": "ceremony_classic",
  "reception": "reception_elegant",
  "rsvp": "rsvp_formal"
}

// Cumpleaños
{
  "hero": "hero_birthday_v2",
  "party": "party_fun",
  "gallery": "gallery_polaroid",
  "rsvp": "rsvp_whatsapp"
}
```

### **sectionsOrder - Ejemplos**

```json
// Orden estándar
["hero_v2", "details_v1", "gallery_v1", "rsvp_basic"]

// Orden personalizado
["hero_v3", "gallery_v1", "details_v2", "rsvp_advanced"]

// Con múltiples heroes
["hero_v1", "hero_romantic_v2", "details_v1", "rsvp_basic"]
```

---

## 🚀 Uso en Frontend

### **Para Renderizar Invitación Pública:**

```javascript
// pages/invitations/[slug].tsx
export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  
  const response = await fetch(`${API_URL}/invitations/public/${slug}`);
  
  if (!response.ok) {
    return { notFound: true };
  }
  
  const invitation = await response.json();
  
  return { props: { invitation } };
};

// Renderizar secciones
invitation.sectionsOrder.map(sectionId => {
  const Component = sectionsRegistry[sectionId];
  const sectionBase = sectionId.split('_')[0];
  const data = invitation.sectionsData[sectionBase];
  
  return <Component key={sectionId} data={data} />;
});
```

### **Para Crear Invitación desde Builder:**

```javascript
const createInvitation = async (invitationData) => {
  const response = await fetch(`${API_URL}/invitations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invitationData)
  });
  
  if (!response.ok) {
    throw new Error('Error creating invitation');
  }
  
  return response.json();
};
```

### **Para Actualizar Secciones:**

```javascript
const updateInvitationSections = async (id, updates) => {
  const response = await fetch(`${API_URL}/invitations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates)
  });
  
  return response.json();
};

// Ejemplo: Cambiar hero de v2 a v3
await updateInvitationSections(invitationId, {
  sectionsUsed: {
    ...currentSectionsUsed,
    hero: "hero_v3"
  },
  sectionsOrder: currentSectionsOrder.map(s => 
    s.startsWith('hero_') ? 'hero_v3' : s
  )
});
```

---

## ⚠️ Consideraciones Importantes

1. **Slugs únicos:** Cada slug debe ser único en todo el sistema
2. **Invitaciones públicas:** Solo las invitaciones con `isPublic: true` son accesibles vía `/public/:slug`
3. **Secciones flexibles:** Puedes usar cualquier combinación de secciones y en cualquier orden
4. **Datos estructurados:** `sectionsData` debe coincidir con las secciones definidas en `sectionsUsed`
5. **Versionado:** Las secciones siguen el patrón `nombre_version` (ej: `hero_v1`, `hero_v2`)

---

## 🔗 URLs de Ejemplo

```
Invitación pública: https://invia.com.ar/invitations/xv-santino
API endpoint: https://ursis.com.ar/invia/api/invitations/public/xv-santino
```

---

## 📞 Soporte

Para dudas sobre la implementación o nuevos endpoints, consultar:
- Documentación del flujo: `/context/flujo.txt`
- Guía de Postman: `/context/postman-collection-guide.md`
- Colección de Postman: `/postman-collection.json`
