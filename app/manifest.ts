import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VraiÂge - Calculateur d\'âge pour animaux',
    short_name: 'VraiÂge',
    description: 'Découvrez le vrai âge biologique de votre chien ou chat',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8b5cf6',
    icons: [],
  }
}
