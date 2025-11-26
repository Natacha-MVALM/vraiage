#!/bin/bash

cd "/Users/natachabarrette/Desktop/Projet Vrai Age/public"

echo "🔄 Remplacement des images par les versions optimisées..."

# Fonction pour remplacer une image
replace_image() {
    local optimized="$1"
    local original="${optimized//-optimized/}"

    if [ -f "$optimized" ]; then
        echo "   Remplace: $original"
        mv "$optimized" "$original"
    fi
}

# Remplacer toutes les images optimisées
find . -name "*-optimized.png" -o -name "*-optimized.jpg" | while read file; do
    replace_image "$file"
done

echo "✅ Images remplacées avec succès!"
echo ""
echo "📊 Nouvelles tailles:"
ls -lh logo-vraiage.png natacha-barrette-original.jpg 2>/dev/null || echo "Fichiers introuvables"
