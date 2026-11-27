#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
IM=$(command -v magick || command -v convert) || { echo "Instale o ImageMagick."; exit 1; }
convert_img() { "$IM" "$1" -auto-orient -resize 1200x1800^ -gravity north -extent 1200x1800 -strip -quality 82 "$2"; echo "✓ $2"; }

shopt -s nullglob nocaseglob
for f in img/looks/*/*.{png,jpg,jpeg,webp}; do
  model=$(basename "$(dirname "$f")"); name=$(basename "${f%.*}")
  mkdir -p "public/images/looks/$model"
  convert_img "$f" "public/images/looks/$model/$name.webp"
done
for f in img/*-original.{png,jpg,jpeg,webp}; do
  model=$(basename "${f%-original.*}")
  [ -e "public/images/$model.webp" ] || convert_img "$f" "public/images/$model.webp"
done
