# 🌐 Configuration DNS et Email - VraiÂge

**Date de configuration** : 26 novembre 2025
**Statut** : ✅ Complété (Resend en attente de vérification)

---

## 📊 **Résumé**

Migration des nameservers de Vercel vers Hover et configuration de Resend pour le formulaire de contact.

---

## 🌐 **Configuration DNS**

### **Nameservers (Hover)**
```
ns1.hover.com
ns2.hover.com
```

### **Enregistrements DNS sur Hover**

| Type | Host | Value | TTL | Usage |
|------|------|-------|-----|-------|
| A | @ | 76.76.21.21 | 15 min | vraiage.com → Vercel |
| A | www | 76.76.21.21 | 15 min | www.vraiage.com → Vercel |
| TXT | resend._domainkey | p=MIGfMA0GCSqGSIb3DQEBA... | 15 min | Resend email verification |
| TXT | @ | v=spf1 include:amazonses.com ~all | 15 min | SPF record |
| MX | @ | 10 feedback-smtp.us-east-1.amazonses.com | 15 min | Email bounce handling |

---

## 📧 **Configuration Resend**

### **Domaines configurés**
- ✅ `ecoutenala.ca` - Valid Configuration
- ⏳ `vraiage.com` - Pending (en attente vérification DNS)

### **Variables d'environnement Vercel**

**Production, Preview, Development :**
```bash
RESEND_API_KEY=re_[clé_masquée]
RESEND_FROM_EMAIL=noreply@vraiage.com
RESEND_TO_EMAIL=admin@ecoutenala.ca
```

**Backup (si vraiage.com reste Pending) :**
```bash
RESEND_FROM_EMAIL=noreply@ecoutenala.ca  # Déjà vérifié, fonctionne immédiatement
```

---

## 🔄 **Chronologie de migration**

### **26 novembre 2025 - Matin**
- ✅ Audit sécurité et performance
- ✅ Corrections critiques (sanitization, rate limiting, images)
- ✅ Commit et push vers GitHub
- ✅ Déploiement automatique Vercel

### **26 novembre 2025 - Après-midi**
- ✅ Configuration compte Resend
- ✅ Ajout DNS TXT resend._domainkey sur Hover
- ✅ Migration nameservers Vercel → Hover
- ✅ Mise à jour DNS records (A, TXT, MX)
- ✅ Configuration variables Vercel
- ✅ Redéploiement application

### **27 novembre 2025 - Matin (prévu)**
- ⏳ Vérification statut Resend (Pending → Verified)
- ⏳ Tests formulaire de contact
- ⏳ Tests finaux avant lancement

---

## ✅ **Tests de vérification**

### **Test 1 : DNS Propagation**
```bash
# Vérifier nameservers
dig NS vraiage.com +short
# Attendu: ns1.hover.com, ns2.hover.com

# Vérifier IP
dig vraiage.com +short
# Attendu: 76.76.21.21

# Vérifier Resend DNS
dig TXT resend._domainkey.vraiage.com +short
# Attendu: "p=MIGfMA0GCSqGSIb3DQEBA..."
```

### **Test 2 : Site accessible**
- ✅ https://vraiage.com (fonctionne)
- ✅ https://www.vraiage.com (fonctionne)

### **Test 3 : Formulaire de contact**
**À tester demain matin (quand Resend verified) :**
1. Aller sur https://vraiage.com
2. Remplir formulaire de contact
3. Vérifier email arrive à admin@ecoutenala.ca
4. Vérifier expéditeur est noreply@vraiage.com

---

## 🆘 **Troubleshooting**

### **Si Resend reste "Pending" > 24h**

**Vérifier DNS :**
```bash
dig TXT resend._domainkey.vraiage.com +short
```

Si vide → Attendre propagation DNS (max 48h)
Si visible → Contacter support Resend

**Solution temporaire :**
Utiliser `ecoutenala.ca` (déjà vérifié) :
```bash
# Sur Vercel → Environment Variables
RESEND_FROM_EMAIL=noreply@ecoutenala.ca
```

### **Si emails n'arrivent pas**

1. **Vérifier dossier Spam** de admin@ecoutenala.ca
2. **Vérifier logs Vercel** :
   - Deployments → Latest → Functions
   - Chercher `/api/contact`
   - Vérifier erreurs
3. **Tester API directement** :
   ```bash
   curl -X POST https://vraiage.com/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","message":"Test"}'
   ```

### **Si rate limiting bloque trop**

Actuellement : 5 emails/heure par IP

Pour augmenter :
```typescript
// app/api/contact/route.ts ligne 12
const maxRequests = 10; // Au lieu de 5
```

---

## 📋 **Checklist maintenance**

### **Mensuel**
- [ ] Vérifier validité domaine Resend
- [ ] Vérifier logs erreurs formulaire contact
- [ ] Tester envoi email

### **Annuel**
- [ ] Renouveler domaine vraiage.com sur Hover
- [ ] Vérifier API key Resend toujours valide
- [ ] Audit DNS records

---

## 🔗 **Liens utiles**

- **Hover DNS** : https://hover.com/control_panel/domain/vraiage.com/dns
- **Resend Dashboard** : https://resend.com/domains
- **Vercel Domains** : https://vercel.com/natacha/vraiage/settings/domains
- **Vercel Env Vars** : https://vercel.com/natacha/vraiage/settings/environment-variables

---

## 📝 **Notes**

### **Pourquoi Hover au lieu de Vercel DNS ?**
- ✅ Centralisation de tous les domaines sur Hover
- ✅ Interface plus simple pour gérer DNS
- ✅ Permet configuration Resend (TXT records)
- ✅ Pas de dépendance exclusive à Vercel

### **Pourquoi vraiage.com au lieu de ecoutenala.ca ?**
- ✅ Plus cohérent (email vient du même domaine que le site)
- ✅ Plus professionnel
- ✅ Branding unifié

---

**Dernière mise à jour** : 26 novembre 2025, 18h00
**Par** : Claude Code + Natacha Barrette
**Statut** : Configuration complétée, en attente vérification Resend (24-48h)
