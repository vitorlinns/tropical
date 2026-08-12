import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPageLayout,
  type LegalSection,
} from "@/components/legal/LegalPageLayout";
import {
  P,
  Strong,
  Bullets,
  Notice,
  ContactCard,
} from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Termos de Uso | Tropical Milhas",
  description:
    "Conheça os Termos de Uso da Tropical Milhas: regras, direitos e responsabilidades para a utilização da nossa plataforma de passagens com milhas.",
};

const LAST_UPDATED = "30 de maio de 2026";

const sections: LegalSection[] = [
  {
    id: "aceitacao",
    title: "Aceitação dos termos",
    content: (
      <>
        <P>
          Bem-vindo à <Strong>Tropical Milhas</Strong>. Estes Termos de Uso
          (&ldquo;Termos&rdquo;) regulam o acesso e a utilização do nosso site,
          aplicativos e serviços (em conjunto, a &ldquo;Plataforma&rdquo;).
        </P>
        <P>
          Ao acessar ou utilizar a Plataforma, você declara ter lido,
          compreendido e concordado com estes Termos e com a nossa{" "}
          <Link
            href="/politica-de-privacidade"
            className="font-semibold text-[#FF6B35] underline-offset-2 hover:underline"
          >
            Política de Privacidade
          </Link>
          . Caso não concorde com qualquer disposição, você não deve utilizar a
          Plataforma.
        </P>
      </>
    ),
  },
  {
    id: "definicoes",
    title: "Definições",
    content: (
      <>
        <P>Para os fins destes Termos, considera-se:</P>
        <Bullets
          items={[
            <>
              <Strong>Usuário:</Strong> pessoa que acessa ou utiliza a
              Plataforma.
            </>,
            <>
              <Strong>Conta:</Strong> cadastro pessoal que permite o acesso aos
              serviços.
            </>,
            <>
              <Strong>Milhas/Pontos:</Strong> unidades de programas de fidelidade
              utilizadas na emissão de passagens.
            </>,
            <>
              <Strong>Serviços:</Strong> intermediação e facilitação da emissão
              de passagens aéreas e produtos relacionados.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "sobre-servico",
    title: "Sobre a Tropical Milhas",
    content: (
      <>
        <P>
          A Tropical Milhas atua como <Strong>intermediadora</Strong>,
          facilitando a emissão de passagens aéreas por meio de milhas, pontos e
          outras condições especiais, conectando usuários a oportunidades de
          viagem mais vantajosas.
        </P>
        <Notice title="Importante">
          A Tropical Milhas não é uma companhia aérea. A prestação do transporte
          aéreo e as regras de cada bilhete são de responsabilidade das
          companhias aéreas emissoras, sujeitando-se às suas políticas e
          condições tarifárias.
        </Notice>
      </>
    ),
  },
  {
    id: "cadastro",
    title: "Cadastro e conta",
    content: (
      <>
        <P>
          Para utilizar determinados serviços, você precisa criar uma conta,
          fornecendo informações verdadeiras, completas e atualizadas. Ao se
          cadastrar, você se compromete a:
        </P>
        <Bullets
          items={[
            "Ter pelo menos 18 anos e capacidade civil plena para contratar.",
            "Fornecer dados corretos e mantê-los atualizados.",
            "Manter a confidencialidade das suas credenciais de acesso.",
            "Responsabilizar-se por todas as atividades realizadas em sua conta.",
            "Comunicar imediatamente qualquer uso não autorizado da conta.",
          ]}
        />
      </>
    ),
  },
  {
    id: "uso-plataforma",
    title: "Uso da plataforma",
    content: (
      <>
        <P>
          Você se compromete a utilizar a Plataforma de forma lícita, ética e em
          conformidade com estes Termos e a legislação aplicável. A Plataforma é
          disponibilizada para uso pessoal e não comercial, salvo autorização
          expressa.
        </P>
        <P>
          A Tropical Milhas pode, a seu critério e a qualquer momento, alterar,
          suspender ou descontinuar funcionalidades, sempre buscando preservar a
          melhor experiência do usuário.
        </P>
      </>
    ),
  },
  {
    id: "milhas-pontos",
    title: "Milhas, pontos e emissão",
    content: (
      <>
        <P>
          A emissão de passagens com milhas está sujeita à disponibilidade de
          assentos, às regras dos programas de fidelidade e às políticas das
          companhias aéreas. Ao contratar:
        </P>
        <Bullets
          items={[
            "A disponibilidade e o valor em milhas podem variar até a confirmação da emissão.",
            "Os dados dos passageiros devem ser exatos; correções podem gerar custos ou impossibilidade de alteração.",
            "Eventuais integrações com contas de fidelidade são feitas mediante sua autorização.",
            "A confirmação da emissão é informada após a conclusão e validação do pagamento.",
          ]}
        />
        <P>
          O prazo de emissão das passagens é, em regra, de até 24 (vinte e
          quatro) horas após a confirmação do pagamento, podendo se estender em
          casos específicos, conforme informado ao usuário.
        </P>
      </>
    ),
  },
  {
    id: "precos-pagamentos",
    title: "Preços e pagamentos",
    content: (
      <>
        <P>
          Os preços, valores em milhas e condições são informados no momento da
          contratação e podem incluir taxas de embarque, tarifas e custos de
          serviço. As formas de pagamento aceitas são apresentadas no checkout.
        </P>
        <Bullets
          items={[
            "Os valores podem sofrer reajustes até a confirmação da compra.",
            "Pagamentos são processados por parceiros especializados, com segurança.",
            "Em caso de falha ou não aprovação do pagamento, a reserva poderá ser cancelada.",
          ]}
        />
      </>
    ),
  },
  {
    id: "cancelamento",
    title: "Cancelamento, alteração e reembolso",
    content: (
      <>
        <P>
          As regras de cancelamento, alteração e reembolso seguem,
          primordialmente, as <Strong>políticas das companhias aéreas</Strong> e
          dos programas de fidelidade envolvidos em cada bilhete. Nossa equipe
          auxiliará você durante todo o processo.
        </P>
        <P>
          Quando aplicável, o direito de arrependimento previsto no art. 49 do
          Código de Defesa do Consumidor poderá ser exercido no prazo de 7
          (sete) dias para contratações realizadas fora do estabelecimento
          comercial, observadas as particularidades dos serviços de transporte
          aéreo e suas regras tarifárias.
        </P>
        <Notice>
          Taxas, multas e diferenças tarifárias eventualmente cobradas pelas
          companhias aéreas ou programas de fidelidade são de responsabilidade do
          usuário, quando previstas nas regras do bilhete.
        </Notice>
      </>
    ),
  },
  {
    id: "responsabilidades",
    title: "Responsabilidades e limitações",
    content: (
      <>
        <P>
          A Tropical Milhas empenha-se para oferecer um serviço de qualidade,
          mas, por atuar como intermediadora, não se responsabiliza por:
        </P>
        <Bullets
          items={[
            "Atrasos, cancelamentos, overbooking ou alterações de voos realizados pelas companhias aéreas.",
            "Decisões, políticas ou alterações de regras dos programas de fidelidade.",
            "Indisponibilidades temporárias da Plataforma decorrentes de manutenção ou força maior.",
            "Danos resultantes do uso indevido da conta ou de informações incorretas fornecidas pelo usuário.",
          ]}
        />
        <P>
          Nada nestes Termos exclui ou limita responsabilidades que não possam
          ser afastadas conforme a legislação aplicável, incluindo o Código de
          Defesa do Consumidor.
        </P>
      </>
    ),
  },
  {
    id: "conduta-proibida",
    title: "Condutas proibidas",
    content: (
      <>
        <P>Ao utilizar a Plataforma, é vedado ao usuário:</P>
        <Bullets
          items={[
            "Fornecer informações falsas ou de terceiros sem autorização.",
            "Praticar fraudes, lavagem de dinheiro ou qualquer atividade ilícita.",
            "Tentar acessar áreas restritas ou comprometer a segurança dos sistemas.",
            "Utilizar robôs, scrapers ou meios automatizados não autorizados.",
            "Reproduzir, revender ou explorar comercialmente a Plataforma sem permissão.",
          ]}
        />
      </>
    ),
  },
  {
    id: "propriedade-intelectual",
    title: "Propriedade intelectual",
    content: (
      <>
        <P>
          Todo o conteúdo da Plataforma, incluindo marca, logotipo, textos,
          imagens, layout, código-fonte e funcionalidades, pertence à Tropical
          Milhas ou a seus licenciadores e é protegido pela legislação de
          propriedade intelectual. É proibida qualquer utilização sem
          autorização prévia e expressa.
        </P>
      </>
    ),
  },
  {
    id: "privacidade",
    title: "Privacidade e proteção de dados",
    content: (
      <>
        <P>
          O tratamento dos seus dados pessoais é regido pela nossa{" "}
          <Link
            href="/politica-de-privacidade"
            className="font-semibold text-[#FF6B35] underline-offset-2 hover:underline"
          >
            Política de Privacidade
          </Link>
          , elaborada em conformidade com a Lei Geral de Proteção de Dados
          (LGPD). Ao utilizar a Plataforma, você reconhece estar ciente das
          práticas ali descritas.
        </P>
      </>
    ),
  },
  {
    id: "suspensao",
    title: "Suspensão e encerramento",
    content: (
      <>
        <P>
          Podemos suspender ou encerrar o acesso de usuários que violem estes
          Termos, a legislação vigente ou que pratiquem condutas que coloquem em
          risco a segurança da Plataforma e de outros usuários. Você pode
          encerrar sua conta a qualquer momento, observadas as obrigações
          pendentes.
        </P>
      </>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações dos termos",
    content: (
      <>
        <P>
          Estes Termos podem ser atualizados a qualquer momento para refletir
          melhorias nos serviços ou mudanças legais. A data da última atualização
          está indicada no topo deste documento. O uso contínuo da Plataforma
          após alterações implica concordância com os Termos revisados.
        </P>
      </>
    ),
  },
  {
    id: "legislacao",
    title: "Legislação aplicável e foro",
    content: (
      <>
        <P>
          Estes Termos são regidos pelas leis da República Federativa do Brasil.
          Fica eleito o foro do domicílio do consumidor para dirimir quaisquer
          controvérsias, sem prejuízo de outros foros previstos em lei, e
          incentivamos a busca por soluções amigáveis antes de medidas judiciais.
        </P>
      </>
    ),
  },
  {
    id: "contato",
    title: "Contato",
    content: (
      <>
        <P>
          Em caso de dúvidas sobre estes Termos de Uso, fale com a nossa equipe:
        </P>
        <ContactCard
          email="contato@tropicalmilhas.com.br"
          phone="(21) 98432-7651"
          address="Av. Rio Branco, 156, Sala 1204, Centro, Rio de Janeiro/RJ"
        />
      </>
    ),
  },
];

export default function TermosDeUsoPage() {
  return (
    <LegalPageLayout
      badge="Termos & Condições"
      title={
        <>
          Termos de <span className="text-[#FF6B35]">Uso</span>
        </>
      }
      description="As regras que garantem uma relação clara e segura entre você e a Tropical Milhas. Leia com atenção para aproveitar a plataforma com total tranquilidade."
      lastUpdated={LAST_UPDATED}
      sections={sections}
    />
  );
}
