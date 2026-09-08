// Conteúdo do portal, portado de `Sertão em Pauta.dc.html` (Claude Design).
// As datas do design (`date` + `time` + `age`) viraram ISO em America/Maceio (UTC-3, sem horário
// de verão), porque JSON-LD, og:article, sitemap e RSS precisam de timestamp real.

export type CategorySlug = 'alagoas' | 'politica' | 'sertao' | 'cidades' | 'brasil';
export type AuthorKey = 'redacao' | 'ana' | 'carlos' | 'lucas' | 'maria' | 'joao' | 'rita';

export type Block =
  | { t: 'p' | 'h2'; text: string }
  | { t: 'quote'; text: string; by?: string }
  | { t: 'img'; text: string; by: string }
  | { t: 'also'; ref: number }
  | { t: 'ad' };

export type Article = {
  id: number;
  slug: string;
  cat: CategorySlug | 'opiniao';
  author: AuthorKey;
  publishedAt: string;
  updatedAt: string;
  read: string;
  views: number;
  credit: string;
  tags: string[];
  title: string;
  sub: string;
  caption?: string;
  featured?: boolean;
  breaking?: boolean;
  blocks?: Block[];
};

export const CATS: { slug: CategorySlug; name: string; desc: string }[] = [
  { slug: 'alagoas', name: 'Alagoas', desc: 'O que acontece no estado e chega ao Sertão: governo, economia, educação e serviços públicos.' },
  { slug: 'politica', name: 'Política', desc: 'Câmaras, prefeituras, Assembleia e o jogo eleitoral visto do Alto Sertão.' },
  { slug: 'sertao', name: 'Sertão', desc: 'Água, clima, rio São Francisco, cultura e gente do semiárido alagoano.' },
  { slug: 'cidades', name: 'Cidades', desc: "Delmiro Gouveia, Piranhas, Pão de Açúcar, Água Branca, Olho d'Água do Casado e vizinhas." },
  { slug: 'brasil', name: 'Brasil', desc: 'Decisões nacionais que mudam a vida no interior.' },
];

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  column?: string;
  day?: string;
};

export const AUTHORS: Record<AuthorKey, Author> = {
  redacao: { slug: 'redacao', name: 'Redação', role: 'Sertão em Pauta', bio: 'Equipe de jornalistas do Sertão em Pauta, com sede em Delmiro Gouveia.', initials: 'SP' },
  ana: { slug: 'ana-paula-vieira', name: 'Ana Paula Vieira', role: 'Repórter de Política', bio: 'Cobre Câmaras, prefeituras e eleições no Alto Sertão desde 2019. Formada em Jornalismo pela Ufal.', initials: 'AV' },
  carlos: { slug: 'carlos-nunes', name: 'Carlos Eduardo Nunes', role: 'Editor de Cidades', bio: 'Jornalista há 14 anos, passou por rádios de Piranhas e Pão de Açúcar antes de fundar o portal.', initials: 'CN' },
  lucas: { slug: 'lucas-ribeiro', name: 'Lucas Ribeiro', role: 'Repórter', bio: 'Cobre meio ambiente, rio São Francisco e turismo. Nascido em Piranhas.', initials: 'LR' },
  maria: { slug: 'maria-do-carmo', name: 'Maria do Carmo Leite', role: 'Colunista', bio: 'Professora aposentada e escritora. Escreve às terças sobre educação e memória do Sertão.', initials: 'ML', column: 'Do lado de cá', day: 'terças' },
  joao: { slug: 'joao-ferro', name: 'João Batista Ferro', role: 'Colunista', bio: 'Economista, ex-secretário de Planejamento de Delmiro Gouveia. Escreve às quintas.', initials: 'JF', column: 'Contas do Sertão', day: 'quintas' },
  rita: { slug: 'rita-cavalcante', name: 'Rita Cavalcante', role: 'Colunista', bio: 'Advogada e cientista política. Escreve aos sábados sobre poder local.', initials: 'RC', column: 'Poder local', day: 'sábados' },
};

export const COLUMNIST_KEYS: AuthorKey[] = ['maria', 'joao', 'rita'];

export const ARTICLES: Article[] = [
  { id: 1, slug: 'carreata-paulao-sertao', cat: 'politica', author: 'redacao', publishedAt: '2026-09-08T14:32:00-03:00', updatedAt: '2026-09-08T16:05:00-03:00', read: '5 min', views: 9800, featured: true, credit: 'Divulgação', tags: ['Eleições 2026', 'Paulão', 'Alto Sertão'],
    title: 'Carreata de Paulão movimenta o Sertão de Alagoas e reforça sintonia com Lula',
    sub: "Mobilização percorreu Olho d'Água do Casado, Piranhas e Delmiro Gouveia e reuniu cerca de 250 veículos, segundo estimativa da organização.",
    caption: 'Carreata do candidato Paulão (PT) percorreu o Alto Sertão alagoano e reuniu cerca de 250 veículos.',
    blocks: [
      { t: 'p', text: "O Sertão de Alagoas foi palco, nesta segunda-feira (7), de uma grande mobilização política em torno da candidatura de Paulão (PT) à Câmara dos Deputados. A carreata reuniu, segundo estimativa da organização, cerca de 250 veículos e percorreu três municípios do Alto Sertão: Olho d'Água do Casado, Piranhas e Delmiro Gouveia." },
      { t: 'p', text: "A concentração aconteceu em Olho d'Água do Casado, município administrado pelo prefeito Chico Bezerra (PT) e onde o grupo político que tem entre suas principais lideranças o ex-prefeito Zé da Emater mantém forte presença. De lá, os veículos seguiram em direção a Piranhas e, posteriormente, a Delmiro Gouveia, percorrendo um dos principais eixos urbanos da região." },
      { t: 'p', text: 'Durante todo o percurso, bandeiras do Partido dos Trabalhadores e mensagens de apoio ao presidente Luiz Inácio Lula da Silva marcaram a mobilização. A sintonia entre os dois nomes foi destaque nas manifestações dos participantes, com o mote que tem sido repetido na campanha: “Lula é 13, Paulão é 1313”.' },
      { t: 'ad' },
      { t: 'h2', text: 'Mobilização em Piranhas ganha destaque com participação do professor Iata' },
      { t: 'p', text: 'Na passagem da carreata por Piranhas, um dos nomes que chamou atenção foi o do professor Iata, atual diretor-geral do Instituto Federal de Alagoas (IFAL) – Campus Piranhas. Ele participou da organização do percurso no município e contribuiu para a mobilização da base local durante a passagem da comitiva.' },
      { t: 'quote', text: 'O Sertão não quer favor, quer presença. Quem vem aqui em setembro tem que voltar em março.', by: 'Professor Iata, diretor-geral do IFAL Piranhas' },
      { t: 'also', ref: 11 },
      { t: 'p', text: 'Reconhecido por sua atuação na educação pública e pela gestão do IFAL, o professor Iata tem uma relação próxima com Piranhas, o que foi reforçado em 2025, quando recebeu o título de Cidadão Piranhense, em reconhecimento à sua trajetória e aos serviços prestados ao município.' },
      { t: 'img', text: 'Concentração dos veículos na entrada de Piranhas, no início da tarde.', by: 'Lucas Ribeiro/Sertão em Pauta' },
      { t: 'h2', text: 'Delmiro Gouveia encerra o percurso' },
      { t: 'p', text: 'O trajeto terminou na Praça da Bandeira, em Delmiro Gouveia, com discurso curto do candidato e distribuição de material de campanha. A Polícia Militar acompanhou o deslocamento e não registrou ocorrências. Procurada, a coordenação de campanha de adversários locais não comentou.' },
    ] },
  { id: 2, slug: 'delmiro-avenida-comendador-peixoto', cat: 'cidades', author: 'carlos', publishedAt: '2026-09-08T12:10:00-03:00', updatedAt: '2026-09-08T12:40:00-03:00', read: '3 min', views: 6100, credit: 'Ascom Delmiro Gouveia', tags: ['Delmiro Gouveia', 'Obras'],
    title: 'Delmiro Gouveia libera novo trecho da Avenida Comendador Peixoto após oito meses de obras', sub: 'Trecho de 1,2 km entre o Mercado Público e o Bairro Eldorado recebeu drenagem, asfalto novo e ciclofaixa; prefeitura promete iluminação em LED até outubro.' },
  { id: 3, slug: 'sao-francisco-cota-minima-piranhas', cat: 'sertao', author: 'lucas', publishedAt: '2026-09-08T10:48:00-03:00', updatedAt: '2026-09-08T11:20:00-03:00', read: '4 min', views: 8400, credit: 'Lucas Ribeiro', tags: ['Rio São Francisco', 'Piranhas', 'Pesca'],
    title: 'Nível do São Francisco em Piranhas atinge menor cota do ano e preocupa pescadores', sub: 'Vazão de Xingó caiu para 700 m³/s; colônia de pescadores relata queda de 40% na captura de curimatã e piau.' },
  { id: 4, slug: 'edital-adutoras-alto-sertao', cat: 'alagoas', author: 'ana', publishedAt: '2026-09-08T09:15:00-03:00', updatedAt: '2026-09-08T09:50:00-03:00', read: '3 min', views: 5200, credit: 'Agência Alagoas', tags: ['Água', 'Governo de Alagoas'],
    title: 'Governo de Alagoas anuncia edital de R$ 120 milhões para adutoras no Alto Sertão', sub: 'Recursos vão ampliar a Adutora do Sertão e levar água encanada a 22 comunidades rurais de Água Branca, Mata Grande e Inhapi.' },
  { id: 5, slug: 'pao-de-acucar-ldo-2027', cat: 'politica', author: 'ana', publishedAt: '2026-09-07T19:02:00-03:00', updatedAt: '2026-09-07T19:30:00-03:00', read: '3 min', views: 2100, credit: 'Câmara de Pão de Açúcar', tags: ['Pão de Açúcar', 'Orçamento'],
    title: 'Câmara de Pão de Açúcar aprova LDO 2027 com previsão de R$ 98 milhões', sub: 'Texto passou por 9 votos a 2; oposição questiona reajuste de 12% no custeio da Secretaria de Comunicação.' },
  { id: 6, slug: 'agua-branca-festival-de-inverno', cat: 'cidades', author: 'carlos', publishedAt: '2026-09-07T17:44:00-03:00', updatedAt: '2026-09-07T18:00:00-03:00', read: '2 min', views: 7300, credit: 'Divulgação', tags: ['Água Branca', 'Turismo'],
    title: 'Água Branca espera 40 mil visitantes no Festival de Inverno da Serra', sub: 'Programação de cinco dias tem forró pé de serra, feira de queijos e trilhas guiadas até o Mirante do Cruzeiro.' },
  { id: 7, slug: 'canion-xingo-catamara-retoma', cat: 'sertao', author: 'lucas', publishedAt: '2026-09-07T15:20:00-03:00', updatedAt: '2026-09-07T15:20:00-03:00', read: '3 min', views: 4400, credit: 'Divulgação', tags: ['Cânion do Xingó', 'Turismo'],
    title: 'Cânion do Xingó: passeios de catamarã retomam após vistoria da Marinha', sub: 'Embarcações voltaram a operar na sexta; operadores de Piranhas e Canindé estimam prejuízo de R$ 800 mil na semana parada.' },
  { id: 8, slug: 'piso-enfermagem-hospitais-interior', cat: 'brasil', author: 'redacao', publishedAt: '2026-09-07T13:05:00-03:00', updatedAt: '2026-09-07T13:05:00-03:00', read: '4 min', views: 1900, credit: 'Agência Câmara', tags: ['Saúde', 'Congresso'],
    title: 'Congresso aprova reajuste do piso da enfermagem; hospitais do interior avaliam impacto', sub: 'Hospital Regional de Delmiro Gouveia calcula acréscimo de R$ 1,4 milhão por ano na folha.' },
  { id: 9, slug: 'ifal-piranhas-320-vagas', cat: 'alagoas', author: 'redacao', publishedAt: '2026-09-06T11:30:00-03:00', updatedAt: '2026-09-06T11:30:00-03:00', read: '2 min', views: 5800, credit: 'IFAL', tags: ['Educação', 'Piranhas'],
    title: 'Ifal Piranhas abre 320 vagas em cursos técnicos para 2027.1', sub: 'Inscrições vão até 30 de setembro; há vagas em Agroecologia, Informática e Agroindústria, com cotas para escola pública.' },
  { id: 10, slug: 'olho-dagua-feira-noturna', cat: 'cidades', author: 'carlos', publishedAt: '2026-09-06T09:12:00-03:00', updatedAt: '2026-09-06T09:12:00-03:00', read: '2 min', views: 1500, credit: 'Ascom OAC', tags: ["Olho d'Água do Casado", 'Artesanato'],
    title: "Olho d'Água do Casado terá feira noturna de artesanato aos sábados", sub: 'Iniciativa reúne 38 artesãos da renda e do couro na Praça da Matriz, com apresentações culturais a partir das 18h.' },
  { id: 11, slug: 'pre-candidatos-agenda-delmiro', cat: 'politica', author: 'ana', publishedAt: '2026-09-05T18:40:00-03:00', updatedAt: '2026-09-05T18:40:00-03:00', read: '4 min', views: 3300, credit: 'Ana Paula Vieira', tags: ['Eleições 2026', 'Delmiro Gouveia'],
    title: 'Pré-candidatos a deputado intensificam agenda em Delmiro Gouveia', sub: 'Cidade-polo concentra 20% dos eleitores do Alto Sertão e virou parada obrigatória; ao menos seis nomes passaram pela cidade na última semana.' },
  { id: 12, slug: 'estiagem-14-municipios-emergencia', cat: 'sertao', author: 'lucas', publishedAt: '2026-09-08T15:58:00-03:00', updatedAt: '2026-09-08T16:10:00-03:00', read: '3 min', views: 12400, breaking: true, credit: 'Defesa Civil AL', tags: ['Estiagem', 'Defesa Civil'],
    title: 'Estiagem: 14 municípios do Sertão decretam situação de emergência', sub: 'Decretos permitem contratação de carros-pipa sem licitação; Defesa Civil estadual reconhece situação em caráter de urgência.' },
  { id: 13, slug: 'stf-royalties-hidreletricas-xingo', cat: 'brasil', author: 'redacao', publishedAt: '2026-09-04T16:22:00-03:00', updatedAt: '2026-09-04T16:22:00-03:00', read: '5 min', views: 2700, credit: 'STF', tags: ['STF', 'Xingó', 'Royalties'],
    title: 'STF retoma julgamento sobre royalties de hidrelétricas; Xingó está na pauta', sub: 'Decisão pode redistribuir a compensação financeira entre municípios alagados e municípios lindeiros, como Piranhas e Olho d’Água do Casado.' },
  { id: 14, slug: 'piranhas-casario-historico-iphan', cat: 'cidades', author: 'lucas', publishedAt: '2026-09-03T10:05:00-03:00', updatedAt: '2026-09-03T10:05:00-03:00', read: '3 min', views: 4900, credit: 'Iphan', tags: ['Piranhas', 'Patrimônio'],
    title: 'Piranhas restaura casario histórico do centro com recursos do Iphan', sub: 'Vinte e dois imóveis da Rua Grande recebem novo telhado e fachadas; obra deve durar 14 meses.' },
  { id: 15, slug: 'rota-do-cangaco-sinalizacao', cat: 'alagoas', author: 'redacao', publishedAt: '2026-09-02T14:00:00-03:00', updatedAt: '2026-09-02T14:00:00-03:00', read: '2 min', views: 2200, credit: 'Setur AL', tags: ['Rota do Cangaço', 'Turismo'],
    title: 'Rota do Cangaço recebe sinalização turística bilíngue em oito municípios', sub: 'Placas em português e inglês ligam Piranhas à Grota do Angico, em Sergipe, onde Lampião foi morto em 1938.' },
  { id: 16, slug: 'regiao-metropolitana-sertao-assembleia', cat: 'politica', author: 'ana', publishedAt: '2026-09-01T11:11:00-03:00', updatedAt: '2026-09-01T11:11:00-03:00', read: '4 min', views: 3100, credit: 'ALE', tags: ['Assembleia', 'Alto Sertão'],
    title: 'Assembleia debate criação da Região Metropolitana do Sertão', sub: 'Projeto reúne nove municípios em torno de Delmiro Gouveia para gestão compartilhada de transporte, lixo e saúde.' },
  { id: 17, slug: 'delmiro-transporte-escolar-rural', cat: 'cidades', author: 'carlos', publishedAt: '2026-08-30T08:30:00-03:00', updatedAt: '2026-08-30T08:30:00-03:00', read: '3 min', views: 1800, credit: 'Ascom Delmiro Gouveia', tags: ['Delmiro Gouveia', 'Educação'],
    title: 'Delmiro Gouveia renova frota do transporte escolar rural com 12 ônibus', sub: 'Veículos atendem 1.900 alunos de 34 povoados; compra usou recursos do Caminho da Escola.' },
  { id: 18, slug: 'chuvas-agosto-abaixo-media', cat: 'sertao', author: 'lucas', publishedAt: '2026-08-28T17:15:00-03:00', updatedAt: '2026-08-28T17:15:00-03:00', read: '3 min', views: 2600, credit: 'Semarh', tags: ['Clima', 'Estiagem'],
    title: 'Agosto tem chuva 62% abaixo da média no Sertão alagoano, aponta Semarh', sub: 'Água Branca registrou 9 mm no mês; produtores de palma e feijão adiam plantio.' },
  { id: 101, slug: 'o-sertao-que-o-mapa-nao-mostra', cat: 'opiniao', author: 'maria', publishedAt: '2026-09-08T07:00:00-03:00', updatedAt: '2026-09-08T07:00:00-03:00', read: '4 min', views: 3900, credit: '', tags: ['Educação', 'Memória'],
    title: 'O Sertão que o mapa não mostra', sub: 'Toda escola rural fechada é um povoado que envelhece. Reabrir não é nostalgia, é política de permanência.',
    blocks: [
      { t: 'p', text: 'Passei trinta e dois anos entrando em salas de aula com o chão de cimento queimado e o mapa do Brasil pregado com fita crepe. Naquele mapa, o Sertão de Alagoas cabia embaixo do polegar. Hoje, quando vejo a lista de escolas rurais fechadas nos últimos dez anos, percebo que o mapa não mentia: nós é que fomos ficando menores.' },
      { t: 'p', text: 'Não escrevo isso para acusar prefeito ou secretário. Escrevo porque a conta é simples e ninguém quer fazê-la em público: cada escola que fecha economiza uns poucos mil reais por mês e custa, em dez anos, uma comunidade inteira que se muda para a periferia de Delmiro ou de Arapiraca.' },
      { t: 'quote', text: 'Reabrir uma escola rural não é nostalgia. É a política pública mais barata de fixação de gente que existe.' },
      { t: 'h2', text: 'O que dá certo do lado de cá' },
      { t: 'p', text: 'Em Água Branca, a escola do povoado Serra do Bode reabriu em 2024 com turmas multisseriadas e uma professora que mora a 3 km. Em dois anos, quatro famílias voltaram. Não é estatística; é vizinhança. E vizinhança é o que o mapa não mostra.' },
    ] },
  { id: 102, slug: 'xingo-e-a-conta-que-ninguem-quer-pagar', cat: 'opiniao', author: 'joao', publishedAt: '2026-09-04T07:00:00-03:00', updatedAt: '2026-09-04T07:00:00-03:00', read: '5 min', views: 2800, credit: '', tags: ['Xingó', 'Economia'],
    title: 'Xingó e a conta que ninguém quer pagar', sub: 'A hidrelétrica gerou energia para o país por 30 anos. A compensação que chega aos municípios lindeiros não paga nem a manutenção das estradas.',
    blocks: [
      { t: 'p', text: 'Quando a usina de Xingó começou a operar, em 1994, a promessa era de desenvolvimento para a região. A energia foi para o Sudeste; a compensação financeira, dividida por critérios de área alagada, deixou Piranhas e Olho d’Água do Casado com migalhas.' },
      { t: 'p', text: 'O julgamento que o STF retoma esta semana pode mudar a régua. Se prevalecer o critério de impacto — e não apenas o de área — estamos falando de R$ 30 a 40 milhões por ano redistribuídos no Sertão alagoano. É mais do que o orçamento inteiro de alguns municípios da região.' },
      { t: 'quote', text: 'Não pedimos favor à União. Pedimos que a conta da luz que o país pagou chegue ao lugar onde o rio ficou mais estreito.' },
      { t: 'p', text: 'Enquanto isso, é dever das prefeituras preparar planos de aplicação. Dinheiro que chega sem plano vira asfalto de campanha. Dinheiro com plano vira adutora, escola técnica e saneamento.' },
    ] },
  { id: 103, slug: 'a-politica-do-lado-de-ca-da-ponte', cat: 'opiniao', author: 'rita', publishedAt: '2026-09-05T07:00:00-03:00', updatedAt: '2026-09-05T07:00:00-03:00', read: '4 min', views: 3200, credit: '', tags: ['Eleições 2026'],
    title: 'A política do lado de cá da ponte', sub: 'Candidatos redescobrem o Sertão a cada quatro anos. Cabe ao eleitor lembrar quem atravessou a ponte de Piranhas nos outros três.',
    blocks: [
      { t: 'p', text: 'Setembro chegou e, com ele, a romaria. Carreatas, caminhadas, almoços em sítios. O Alto Sertão tem pouco mais de 200 mil eleitores e, de repente, virou o centro do mundo. Não há nada de errado nisso — é assim que a democracia funciona. O problema é o que acontece em outubro.' },
      { t: 'p', text: 'Proponho um exercício: antes de decidir o voto, olhe as emendas parlamentares dos últimos quatro anos. Quem destinou recurso para o Hospital Regional? Quem apareceu na estiagem de 2024 sem câmera? A informação é pública e está no Portal da Transparência.' },
      { t: 'quote', text: 'A ponte de Piranhas tem dois sentidos. O eleitor precisa saber quem só a atravessa em ano par.' },
      { t: 'p', text: 'O voto do Sertão vale o mesmo que o da capital. Mas a atenção que ele recebe depende de nós lembrarmos disso o ano inteiro.' },
    ] },
];

/* ---------------------------------------------------------------- consultas */

const TZ = 'America/Maceio';
const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('pt-BR', { timeZone: TZ, ...o });

const fDate = fmt({ day: 'numeric', month: 'long', year: 'numeric' });
const fShort = fmt({ day: '2-digit', month: '2-digit' });
const fTime = fmt({ hour: '2-digit', minute: '2-digit', hour12: false });
const fToday = fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

/** "8 de setembro de 2026" */
export const longDate = (iso: string) => fDate.format(new Date(iso));
/** "08/09" */
export const shortDate = (iso: string) => fShort.format(new Date(iso));
/** "14h32" — o formato do design */
export const clockTime = (iso: string) => fTime.format(new Date(iso)).replace(':', 'h');
/** "Terça-feira, 8 de setembro de 2026" */
export const todayLong = () => {
  const s = fToday.format(new Date());
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export const ageInDays = (iso: string) => Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);

/** Sem acento e em minúsculas — quem busca "xingo" tem que achar "Xingó". */
export const fold = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const slugify = (s: string) =>
  fold(s)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const isOpinion = (a: Article) => a.cat === 'opiniao';
export const articleHref = (a: Article) => `/${a.cat}/${a.slug}`;
export const authorOf = (a: Article) => AUTHORS[a.author];
export const categoryOf = (a: Article) => CATS.find((c) => c.slug === a.cat);
/** "POLÍTICA" / "OPINIÃO" — o chapéu dourado do design */
export const kicker = (a: Article) => (isOpinion(a) ? 'OPINIÃO' : categoryOf(a)!.name.toUpperCase());
export const categoryName = (a: Article) => (isOpinion(a) ? 'Opinião' : categoryOf(a)!.name);

const byDateDesc = (a: Article, b: Article) => +new Date(b.publishedAt) - +new Date(a.publishedAt);

export const allNews = () => ARTICLES.filter((a) => !isOpinion(a)).sort(byDateDesc);
export const allOpinion = () => ARTICLES.filter(isOpinion).sort(byDateDesc);
export const allArticles = () => [...ARTICLES].sort(byDateDesc);

export const byId = (id: number) => ARTICLES.find((a) => a.id === id);
export const bySlug = (cat: string, slug: string) => ARTICLES.find((a) => a.cat === cat && a.slug === slug);
export const byCategory = (slug: CategorySlug) => allNews().filter((a) => a.cat === slug);
export const byAuthorSlug = (slug: string) => {
  const key = (Object.keys(AUTHORS) as AuthorKey[]).find((k) => AUTHORS[k].slug === slug);
  return key ? { key, author: AUTHORS[key], items: allArticles().filter((a) => a.author === key) } : null;
};
export const byTagSlug = (tagSlug: string) => {
  const name = allTags().find((t) => slugify(t) === tagSlug);
  return name ? { name, items: allArticles().filter((a) => a.tags.some((t) => slugify(t) === tagSlug)) } : null;
};
export const allTags = () => [...new Set(ARTICLES.flatMap((a) => a.tags))];

export const mostRead = (n = 5) => [...allNews()].sort((a, b) => b.views - a.views).slice(0, n);
export const latest = (n = 6) => allNews().slice(0, n);
export const breaking = () => allNews().filter((a) => a.breaking);
export const featured = () => allNews().find((a) => a.featured) ?? allNews()[0];

/** As três seções da home, como no design. */
export const homeSections = () =>
  (['politica', 'cidades', 'sertao'] as CategorySlug[]).map((slug) => {
    const items = byCategory(slug);
    return { cat: CATS.find((c) => c.slug === slug)!, big: items[0], list: items.slice(1, 4) };
  });

export const related = (a: Article, n = 3) =>
  allNews()
    .filter((o) => o.id !== a.id && (o.cat === a.cat || a.tags.some((t) => o.tags.includes(t))))
    .slice(0, n);

export const moreFromCategory = (a: Article, n = 4) =>
  allNews().filter((o) => o.cat === a.cat && o.id !== a.id).slice(0, n);

/** Corpo padrão para as matérias que o design deixou só com título e linha fina. */
export const genericBody = (a: Article): Block[] => [
  { t: 'p', text: a.sub },
  { t: 'p', text: 'A informação foi confirmada pela reportagem do Sertão em Pauta junto às fontes oficiais e a moradores ouvidos no local. Os detalhes do cronograma, dos valores envolvidos e dos responsáveis pela execução foram divulgados em nota e conferidos pela redação.' },
  { t: 'p', text: 'Segundo a assessoria, o próximo passo será a publicação dos atos no Diário Oficial dos Municípios, prevista para os próximos dias. A partir daí, começa a contar o prazo legal para contestações e para a assinatura dos contratos.' },
  { t: 'ad' },
  { t: 'h2', text: 'O que muda para o morador' },
  { t: 'p', text: 'Na prática, o efeito deve ser sentido primeiro nos bairros e povoados diretamente atendidos, com impacto gradual nas cidades vizinhas. Especialistas ouvidos pela reportagem recomendam acompanhar as audiências públicas e cobrar transparência na execução.' },
  { t: 'quote', text: 'O que a gente pede é que o que foi anunciado saia do papel e chegue na ponta, no povoado, na casa da gente.', by: 'Moradora ouvida pela reportagem' },
  { t: 'also', ref: a.id === 1 ? 11 : 1 },
  { t: 'p', text: 'O Sertão em Pauta segue acompanhando o caso e atualizará esta matéria à medida que novas informações forem confirmadas.' },
];

export const bodyOf = (a: Article) => a.blocks ?? genericBody(a);

/** Texto puro do corpo — usado no articleBody do JSON-LD e no description do RSS. */
export const plainText = (a: Article) =>
  bodyOf(a)
    .map((b) => ('text' in b ? b.text : ''))
    .filter(Boolean)
    .join('\n\n');
