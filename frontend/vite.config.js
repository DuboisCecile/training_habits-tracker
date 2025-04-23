import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    fs: {
      // Restreindre l'accès aux fichiers sensibles
      deny: ['.env', '.git', 'node_modules'],
      // Limiter l'accès aux fichiers du projet uniquement
      strict: true,
    },
    // Limiter l'accès au serveur de développement
    host: 'localhost',
    port: 3000,
    // Désactiver l'accès depuis d'autres machines
    open: false,
    // Ajout des configurations de sécurité
    cors: false, // Désactive CORS pour le serveur de développement
    hmr: {
      host: 'localhost',
    },
  },
  // Désactiver les fonctionnalités sensibles en production
  build: {
    rollupOptions: {
      external: ['?raw', '?import'],
    },
  },
});
