import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/app/components/ui';
import { og, twitter } from '@/lib/seo';

const TITLE = 'Termos de Uso';
const DESC = 'As regras para usar o site, a newsletter e os canais do Sertão em Pauta nas redes sociais.';
const UPDATED = '5 de outubro de 2026';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/termos' },
  openGraph: og({ type: 'website', url: '/termos', title: `${TITLE} | Sertão em Pauta`, description: DESC }),
  twitter: twitter(`${TITLE} | Sertão em Pauta`, DESC),
};

const SECTIONS: LegalSection[] = [
  {
    h: 'Aceitação',
    p: [
      'Ao acessar o site do Sertão em Pauta, assinar a newsletter ou interagir com nossos canais e aplicativos em redes sociais, você concorda com estes Termos de Uso e com a nossa Política de Privacidade. Se não concordar, por favor não utilize os serviços.',
    ],
  },
  {
    h: 'O serviço',
    p: [
      'O Sertão em Pauta é um portal de jornalismo regional, com sede em Delmiro Gouveia/AL, que publica notícias, reportagens e artigos de opinião sobre o Sertão de Alagoas. O acesso ao conteúdo é gratuito e não exige cadastro.',
      'Podemos alterar, suspender ou encerrar seções e funcionalidades a qualquer momento, sem aviso prévio.',
    ],
  },
  {
    h: 'Propriedade intelectual',
    p: [
      'Textos, fotos, vídeos, marcas, logotipo e o projeto gráfico do site pertencem ao Sertão em Pauta ou a seus licenciantes e são protegidos pela Lei de Direitos Autorais (Lei nº 9.610/1998).',
      'Você pode compartilhar links das matérias e citar trechos curtos com indicação da fonte e link para o original. A reprodução integral, a republicação comercial e a coleta automatizada de conteúdo em larga escala dependem de autorização prévia por escrito.',
    ],
  },
  {
    h: 'Conteúdo editorial e opinião',
    p: [
      'Trabalhamos para publicar informação correta e atualizada, mas o conteúdo tem caráter informativo e não substitui orientação profissional. Erros podem ser comunicados à redação e serão corrigidos com transparência.',
      'Artigos de opinião e colunas refletem a posição de seus autores, não necessariamente a do Sertão em Pauta.',
    ],
  },
  {
    h: 'Conduta do usuário',
    p: [
      'Ao usar o site e interagir conosco em redes sociais, você se compromete a não publicar conteúdo ilegal, ofensivo, discriminatório, difamatório ou que viole direitos de terceiros; não tentar burlar a segurança do site ou sobrecarregá-lo; e não se passar por outra pessoa ou pela redação.',
      'Podemos ocultar ou remover comentários e mensagens que violem estas regras e bloquear perfis reincidentes.',
    ],
  },
  {
    h: 'Newsletter',
    p: [
      'A inscrição na newsletter é opcional e gratuita. Você pode cancelar a qualquer momento pelo link presente em todas as edições.',
    ],
  },
  {
    h: 'Redes sociais e serviços de terceiros',
    p: [
      'O site contém links e botões de compartilhamento para serviços de terceiros, como Facebook, Instagram, WhatsApp e YouTube, e podemos usar aplicativos integrados a essas plataformas para publicar e distribuir nosso conteúdo. O uso desses serviços é regido pelos termos e políticas de cada plataforma, sobre os quais não temos controle.',
      'Não nos responsabilizamos pelo conteúdo de sites externos para os quais apontamos.',
    ],
  },
  {
    h: 'Publicidade',
    p: [
      'O site pode exibir anúncios e conteúdo patrocinado, sempre identificados como tal. Os anunciantes são responsáveis pelo conteúdo de suas peças e pelas ofertas que fazem.',
    ],
  },
  {
    h: 'Limitação de responsabilidade',
    p: [
      'O site é oferecido "como está". Na extensão permitida pela lei, não respondemos por indisponibilidades temporárias, falhas técnicas ou decisões tomadas com base no conteúdo publicado. Nada nestes termos afasta direitos garantidos pelo Código de Defesa do Consumidor ou pelo Marco Civil da Internet.',
    ],
  },
  {
    h: 'Alterações e foro',
    p: [
      'Podemos atualizar estes termos; a data da última atualização aparece no topo da página, e o uso continuado do site após a mudança significa concordância com a nova versão.',
      'Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca de Delmiro Gouveia/AL, ressalvado o direito do consumidor de acionar o foro do seu domicílio.',
    ],
  },
];

export default function Termos() {
  return <LegalPage title={TITLE} desc={DESC} path="/termos" updated={UPDATED} sections={SECTIONS} />;
}
