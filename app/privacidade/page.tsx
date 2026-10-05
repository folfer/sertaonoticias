import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/app/components/ui';
import { CONTACT_EMAIL, og, twitter } from '@/lib/seo';

const TITLE = 'Política de Privacidade';
const DESC = 'Quais dados o Sertão em Pauta coleta, para que usa, com quem compartilha e como você pode pedir a exclusão.';
const UPDATED = '5 de outubro de 2026';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/privacidade' },
  openGraph: og({ type: 'website', url: '/privacidade', title: `${TITLE} | Sertão em Pauta`, description: DESC }),
  twitter: twitter(`${TITLE} | Sertão em Pauta`, DESC),
};

const SECTIONS: LegalSection[] = [
  {
    h: 'Quem somos',
    p: [
      'O Sertão em Pauta é um portal de jornalismo regional com sede na Rua Coronel Peixoto, 112, Delmiro Gouveia/AL. Somos o controlador dos dados pessoais tratados neste site e em nossos aplicativos e integrações com redes sociais, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).',
      `Nosso canal para assuntos de privacidade, inclusive o contato com o encarregado pelo tratamento de dados, é ${CONTACT_EMAIL}.`,
    ],
  },
  {
    h: 'Dados que coletamos',
    p: [
      'Newsletter: o endereço de e-mail que você informa ao se inscrever.',
      'Navegação: dados técnicos como endereço IP, tipo de navegador e dispositivo, páginas visitadas e data e hora de acesso, registrados pelos servidores de hospedagem e, se você aceitar, por ferramentas de medição de audiência.',
      'Preferência de cookies: sua escolha na faixa de cookies fica guardada no seu próprio navegador (armazenamento local).',
      'Busca: os termos que você pesquisa no site são usados apenas para exibir os resultados.',
      'Facebook e Instagram (Meta): quando você interage com nossas páginas, publicações ou aplicativo nessas plataformas, ou autoriza nosso aplicativo, podemos receber as informações que você permitir — como nome, foto de perfil pública, identificador de usuário e o conteúdo de comentários e mensagens enviados a nós.',
      'Não coletamos intencionalmente dados sensíveis nem dados de crianças e adolescentes para fins comerciais.',
    ],
  },
  {
    h: 'Para que usamos os dados',
    p: [
      'Enviar a newsletter a quem se inscreveu (base legal: consentimento).',
      'Medir audiência e melhorar o conteúdo e o funcionamento do site (consentimento, no caso de cookies não essenciais).',
      'Publicar e distribuir nossas notícias em redes sociais e responder a comentários e mensagens (legítimo interesse e execução do serviço solicitado por você).',
      'Garantir a segurança do site, prevenir fraudes e cumprir obrigações legais, como a guarda de registros de acesso prevista no Marco Civil da Internet.',
      'O tratamento de dados para fins exclusivamente jornalísticos segue o art. 4º, II, "a", da LGPD.',
    ],
  },
  {
    h: 'Cookies',
    p: [
      'Usamos armazenamento essencial para lembrar sua escolha de cookies. Cookies de medição de audiência só são carregados depois do seu aceite na faixa exibida no primeiro acesso.',
      'Você pode mudar de ideia a qualquer momento limpando os dados do site no seu navegador; a faixa voltará a aparecer. Os botões de compartilhamento são links simples e não carregam rastreadores de terceiros nesta página — a rede social só recebe dados quando você clica e é levado ao site dela.',
    ],
  },
  {
    h: 'Com quem compartilhamos',
    p: [
      'Não vendemos dados pessoais. Compartilhamos apenas o necessário com fornecedores que operam o serviço em nosso nome — hospedagem do site, envio de e-mails e medição de audiência — e com a Meta Platforms, quando a interação acontece no Facebook ou no Instagram, caso em que também se aplica a política de privacidade da própria Meta.',
      'Alguns desses fornecedores podem processar dados fora do Brasil, observadas as garantias exigidas pela LGPD. Também podemos fornecer dados mediante ordem judicial ou requisição de autoridade competente.',
    ],
  },
  {
    h: 'Por quanto tempo guardamos',
    p: [
      'E-mail da newsletter: até você cancelar a inscrição. Registros de acesso: pelo prazo mínimo de seis meses exigido pelo Marco Civil da Internet. Dados recebidos da Meta: enquanto forem necessários para a finalidade informada ou até você pedir a exclusão.',
    ],
  },
  {
    h: 'Seus direitos',
    p: [
      'Você pode, a qualquer momento e sem custo, pedir confirmação do tratamento, acesso, correção, anonimização, portabilidade ou eliminação dos seus dados, revogar consentimentos e obter informações sobre compartilhamento, conforme o art. 18 da LGPD.',
      `Basta escrever para ${CONTACT_EMAIL}. Respondemos em até 15 dias. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).`,
    ],
  },
  {
    h: 'Exclusão de dados',
    p: [
      `Para excluir os dados que temos sobre você — inclusive os recebidos por meio do Facebook ou do Instagram — envie um e-mail para ${CONTACT_EMAIL} com o assunto "Exclusão de dados", informando o e-mail cadastrado ou o nome do seu perfil na rede social. Concluímos a exclusão em até 15 dias e confirmamos por e-mail.`,
      'Você também pode remover o acesso do nosso aplicativo diretamente no Facebook, em Configurações e privacidade > Configurações > Aplicativos e sites, selecionando o Sertão em Pauta e clicando em Remover.',
      'Para sair da newsletter, use o link de cancelamento presente em todas as edições.',
    ],
  },
  {
    h: 'Segurança',
    p: [
      'Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados, como conexão criptografada (HTTPS) e acesso restrito às pessoas que precisam deles para trabalhar. Nenhum sistema é totalmente imune; se houver incidente relevante, comunicaremos os titulares afetados e a ANPD.',
    ],
  },
  {
    h: 'Alterações desta política',
    p: [
      'Podemos atualizar esta política para refletir mudanças no site ou na legislação. A data da última atualização aparece no topo da página; mudanças relevantes serão destacadas no site.',
    ],
  },
];

export default function Privacidade() {
  return <LegalPage title={TITLE} desc={DESC} path="/privacidade" updated={UPDATED} sections={SECTIONS} />;
}
