// Looks exibidos na galeria flutuante de cada modelo.
// Para adicionar uma foto, salve o arquivo em public/images/looks/<modelo>/<arquivo>.webp
// (proporção vertical 2:3, ex.: 1200x1800). Enquanto o arquivo não existir,
// a galeria mostra um card "Foto em breve" para aquela peça.

export const lookTypes = [
  { slug: 'baby-doll', name: 'Baby doll', description: 'Leveza e transparência na medida certa para noites especiais.' },
  { slug: 'calcinha-transparente', name: 'Calcinha transparente', description: 'Tule delicado que acompanha o corpo sem marcar.' },
  { slug: 'fio-dental', name: 'Fio dental', description: 'Recorte mínimo, conforto máximo — para usar sem pensar duas vezes.' },
  { slug: 'conjunto-renda', name: 'Conjunto de renda', description: 'Sutiã e calcinha em renda com acabamento artesanal.' },
  { slug: 'body', name: 'Body', description: 'Uma peça só, do decote ao quadril, que vira look por baixo de tudo.' },
  { slug: 'camisola', name: 'Camisola', description: 'Cetim fluido que desliza na pele.' },
];

const campaign = {
  ane: { name: 'Conjunto bordô', description: 'Renda bordô da campanha Essência.' },
  dany: { name: 'Conjunto preto', description: 'Renda preta com detalhes em vermelho, da campanha Essência.' },
  mya: { name: 'Conjunto champanhe', description: 'Cetim champanhe com renda, da campanha Essência.' },
};

export function looksFor(modelSlug) {
  return [
    { slug: 'campanha', ...campaign[modelSlug], image: `images/${modelSlug}.webp` },
    ...lookTypes.map((look) => ({ ...look, image: `images/looks/${modelSlug}/${look.slug}.webp` })),
  ];
}
