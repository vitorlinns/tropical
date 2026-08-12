import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPageLayout,
  type LegalSection,
} from "@/components/legal/LegalPageLayout";
import {
  P,
  Sub,
  Strong,
  Bullets,
  Notice,
  ContactCard,
} from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Política de Privacidade | Tropical Milhas",
  description:
    "Saiba como a Tropical Milhas coleta, utiliza, compartilha e protege seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
};

const LAST_UPDATED = "30 de maio de 2026";

const sections: LegalSection[] = [
  {
    id: "introducao",
    title: "Introdução",
    content: (
      <>
        <P>
          A <Strong>Tropical Milhas</Strong> (&ldquo;Tropical Milhas&rdquo;,
          &ldquo;nós&rdquo; ou &ldquo;Empresa&rdquo;) respeita a sua privacidade
          e está comprometida em proteger os dados pessoais de seus usuários,
          clientes e visitantes. Esta Política de Privacidade descreve como
          coletamos, utilizamos, armazenamos, compartilhamos e protegemos suas
          informações ao utilizar nosso site, aplicativos e serviços.
        </P>
        <P>
          Este documento foi elaborado em conformidade com a{" "}
          <Strong>
            Lei nº 13.709/2018, a Lei Geral de Proteção de Dados Pessoais (LGPD)
          </Strong>
          , com o Marco Civil da Internet (Lei nº 12.965/2014) e demais
          normas aplicáveis.
        </P>
        <Sub>Quem é o controlador dos seus dados</Sub>
        <P>
          Para os fins da LGPD, o <Strong>controlador</Strong> dos dados pessoais
          tratados nesta plataforma é:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Razão social:</Strong> Tropical Milhas Assessoria em
              Viagens Ltda.
            </>,
            <>
              <Strong>CNPJ:</Strong> 47.382.951/0001-63
            </>,
            <>
              <Strong>Endereço:</Strong> Av. Rio Branco, 156, Sala 1204,
              Centro, Rio de Janeiro/RJ, CEP 20040-901
            </>,
            <>
              <Strong>E-mail de privacidade:</Strong>{" "}
              privacidade@tropicalmilhas.com.br
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "definicoes",
    title: "Definições importantes",
    content: (
      <>
        <P>
          Para facilitar a leitura, alguns termos utilizados nesta Política têm
          o significado definido pela LGPD:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Dado pessoal:</Strong> informação relacionada a pessoa
              natural identificada ou identificável.
            </>,
            <>
              <Strong>Dado pessoal sensível:</Strong> dado sobre origem racial
              ou étnica, convicção religiosa, opinião política, saúde, vida
              sexual, dado genético ou biométrico, entre outros.
            </>,
            <>
              <Strong>Titular:</Strong> a pessoa natural a quem se referem os
              dados pessoais (você).
            </>,
            <>
              <Strong>Tratamento:</Strong> toda operação realizada com dados
              pessoais, como coleta, uso, acesso, armazenamento, compartilhamento
              e eliminação.
            </>,
            <>
              <Strong>Controlador:</Strong> a quem competem as decisões sobre o
              tratamento de dados (a Tropical Milhas).
            </>,
            <>
              <Strong>Operador:</Strong> quem realiza o tratamento em nome do
              controlador.
            </>,
            <>
              <Strong>Encarregado (DPO):</Strong> pessoa indicada para atuar como
              canal de comunicação entre o controlador, os titulares e a ANPD.
            </>,
            <>
              <Strong>ANPD:</Strong> Autoridade Nacional de Proteção de Dados.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "dados-coletados",
    title: "Dados que coletamos",
    content: (
      <>
        <P>
          Coletamos diferentes categorias de dados pessoais, de acordo com a sua
          interação com a Tropical Milhas:
        </P>
        <Sub>Dados fornecidos por você</Sub>
        <Bullets
          items={[
            <>
              <Strong>Dados cadastrais:</Strong> nome completo, CPF, data de
              nascimento, e-mail, telefone e endereço.
            </>,
            <>
              <Strong>Dados de viagem:</Strong> documentos exigidos para emissão
              (RG, passaporte), nome dos passageiros, preferências e datas.
            </>,
            <>
              <Strong>Dados de programas de fidelidade:</Strong> número e saldo
              de contas de milhas/pontos, quando você opta por integrá-los.
            </>,
            <>
              <Strong>Dados de pagamento:</Strong> informações necessárias para
              processar transações (processadas por parceiros de pagamento).
            </>,
            <>
              <Strong>Dados de atendimento:</Strong> conteúdo de mensagens,
              chamados e interações com nosso suporte.
            </>,
          ]}
        />
        <Sub>Dados coletados automaticamente</Sub>
        <Bullets
          items={[
            <>
              <Strong>Dados de navegação:</Strong> endereço IP, tipo de
              dispositivo, navegador, sistema operacional e páginas acessadas.
            </>,
            <>
              <Strong>Cookies e identificadores:</Strong> conforme descrito na
              seção de Cookies abaixo.
            </>,
            <>
              <Strong>Dados de uso:</Strong> registros de acesso, data e hora das
              ações realizadas na plataforma.
            </>,
          ]}
        />
        <Notice title="Dados sensíveis">
          A Tropical Milhas não tem como objetivo coletar dados pessoais
          sensíveis. Caso algum dado dessa natureza seja necessário para uma
          finalidade específica, solicitaremos o seu consentimento destacado e
          informado.
        </Notice>
      </>
    ),
  },
  {
    id: "finalidades",
    title: "Finalidades e bases legais",
    content: (
      <>
        <P>
          Tratamos seus dados apenas para finalidades legítimas, específicas e
          informadas, sempre amparados por uma das bases legais previstas no
          art. 7º da LGPD:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Execução de contrato:</Strong> cadastrar você, processar
              compras, emitir passagens e prestar suporte.
            </>,
            <>
              <Strong>Cumprimento de obrigação legal/regulatória:</Strong>{" "}
              atender exigências fiscais, contábeis e de órgãos competentes.
            </>,
            <>
              <Strong>Legítimo interesse:</Strong> prevenir fraudes, garantir
              segurança, melhorar nossos produtos e personalizar a experiência.
            </>,
            <>
              <Strong>Consentimento:</Strong> envio de comunicações de marketing
              e uso de cookies não essenciais, quando aplicável.
            </>,
            <>
              <Strong>Exercício regular de direitos:</Strong> defesa em processos
              judiciais, administrativos ou arbitrais.
            </>,
          ]}
        />
        <P>
          Você pode revogar a qualquer momento o consentimento dado para
          finalidades que dependam dele, sem prejuízo dos tratamentos já
          realizados.
        </P>
      </>
    ),
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento de dados",
    content: (
      <>
        <P>
          A Tropical Milhas <Strong>não comercializa</Strong> seus dados
          pessoais. Podemos compartilhá-los, na medida necessária, com:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Companhias aéreas e parceiros de viagem:</Strong> para
              emissão e gestão das passagens e serviços contratados.
            </>,
            <>
              <Strong>Programas de fidelidade e milhas:</Strong> quando a
              transação envolver resgate ou transferência de pontos.
            </>,
            <>
              <Strong>Processadores de pagamento e instituições financeiras:</Strong>{" "}
              para concluir e validar transações com segurança.
            </>,
            <>
              <Strong>Prestadores de serviços (operadores):</Strong> hospedagem,
              tecnologia, análise de dados, atendimento e antifraude.
            </>,
            <>
              <Strong>Autoridades públicas:</Strong> quando exigido por lei,
              ordem judicial ou solicitação de autoridade competente.
            </>,
          ]}
        />
        <P>
          Exigimos que todos os parceiros e operadores adotem medidas de
          segurança compatíveis e tratem os dados estritamente para as
          finalidades acordadas.
        </P>
      </>
    ),
  },
  {
    id: "transferencia-internacional",
    title: "Transferência internacional de dados",
    content: (
      <>
        <P>
          Alguns parceiros e fornecedores de tecnologia podem estar localizados
          fora do Brasil. Nesses casos, a transferência internacional de dados
          ocorrerá em conformidade com os arts. 33 a 36 da LGPD, adotando
          garantias adequadas, tais como cláusulas contratuais específicas e
          países que ofereçam grau de proteção compatível com a legislação
          brasileira.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies e tecnologias semelhantes",
    content: (
      <>
        <P>
          Utilizamos cookies e tecnologias similares para o funcionamento da
          plataforma, análise de desempenho e personalização da experiência. Os
          principais tipos são:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Cookies essenciais:</Strong> indispensáveis para o
              funcionamento do site (não podem ser desativados).
            </>,
            <>
              <Strong>Cookies de desempenho/análise:</Strong> ajudam a entender
              como a plataforma é utilizada.
            </>,
            <>
              <Strong>Cookies de funcionalidade:</Strong> lembram preferências e
              melhoram a navegação.
            </>,
            <>
              <Strong>Cookies de publicidade:</Strong> auxiliam a exibir ofertas
              relevantes, apenas mediante consentimento.
            </>,
          ]}
        />
        <P>
          Você pode gerenciar ou bloquear cookies nas configurações do seu
          navegador. A desativação de alguns cookies pode afetar funcionalidades
          da plataforma.
        </P>
      </>
    ),
  },
  {
    id: "armazenamento",
    title: "Armazenamento e retenção",
    content: (
      <>
        <P>
          Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir
          as finalidades para as quais foram coletados, incluindo eventuais
          obrigações legais, contratuais e regulatórias.
        </P>
        <Bullets
          items={[
            <>
              Dados de cadastro e transações são mantidos durante a relação
              contratual e pelos prazos legais aplicáveis após o seu término.
            </>,
            <>
              Registros de acesso a aplicações são mantidos pelo prazo mínimo de
              6 (seis) meses, conforme o Marco Civil da Internet.
            </>,
            <>
              Após o término dos prazos, os dados são eliminados ou anonimizados
              de forma segura.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "seguranca",
    title: "Segurança da informação",
    content: (
      <>
        <P>
          Adotamos medidas técnicas e administrativas aptas a proteger os dados
          pessoais contra acessos não autorizados e situações acidentais ou
          ilícitas de destruição, perda, alteração, comunicação ou difusão. Entre
          elas:
        </P>
        <Bullets
          items={[
            "Criptografia de dados em trânsito e controles de acesso restrito.",
            "Monitoramento contínuo e políticas internas de segurança.",
            "Treinamento e conscientização das equipes que tratam dados.",
            "Avaliação periódica de fornecedores e parceiros.",
          ]}
        />
        <Notice title="Incidentes de segurança">
          Em caso de incidente de segurança que possa acarretar risco ou dano
          relevante aos titulares, comunicaremos a ANPD e os titulares afetados,
          conforme exigido pela LGPD.
        </Notice>
      </>
    ),
  },
  {
    id: "direitos",
    title: "Seus direitos como titular",
    content: (
      <>
        <P>
          Nos termos do art. 18 da LGPD, você pode, a qualquer momento, exercer
          os seguintes direitos sobre seus dados pessoais:
        </P>
        <Bullets
          items={[
            "Confirmação da existência de tratamento.",
            "Acesso aos dados que tratamos sobre você.",
            "Correção de dados incompletos, inexatos ou desatualizados.",
            "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei.",
            "Portabilidade dos dados a outro fornecedor, mediante requisição.",
            "Eliminação dos dados tratados com base no consentimento.",
            "Informação sobre as entidades com as quais compartilhamos seus dados.",
            "Informação sobre a possibilidade de não fornecer consentimento e suas consequências.",
            "Revogação do consentimento.",
          ]}
        />
      </>
    ),
  },
  {
    id: "como-exercer",
    title: "Como exercer seus direitos",
    content: (
      <>
        <P>
          Para exercer qualquer um dos direitos acima, entre em contato com nosso
          Encarregado pelo e-mail <Strong>privacidade@tropicalmilhas.com.br</Strong>
          . Poderemos solicitar informações adicionais para confirmar a sua
          identidade e garantir a segurança dos seus dados.
        </P>
        <P>
          Responderemos às suas solicitações dentro dos prazos previstos na
          legislação aplicável. Algumas solicitações podem ser limitadas por
          obrigações legais que exijam a manutenção de determinados dados.
        </P>
      </>
    ),
  },
  {
    id: "menores",
    title: "Dados de crianças e adolescentes",
    content: (
      <>
        <P>
          Nossos serviços são destinados a maiores de 18 anos. O tratamento de
          dados de crianças e adolescentes, quando ocorrer, será feito em seu
          melhor interesse e, no caso de crianças, mediante consentimento
          específico e em destaque de pelo menos um dos pais ou responsável
          legal, conforme o art. 14 da LGPD.
        </P>
      </>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações desta Política",
    content: (
      <>
        <P>
          Esta Política de Privacidade pode ser atualizada periodicamente para
          refletir mudanças em nossas práticas ou na legislação. A data da última
          atualização está indicada no topo deste documento. Recomendamos a
          revisão regular desta página. Alterações relevantes poderão ser
          comunicadas por meios adicionais.
        </P>
      </>
    ),
  },
  {
    id: "encarregado",
    title: "Encarregado (DPO) e contato",
    content: (
      <>
        <P>
          Em caso de dúvidas, solicitações ou reclamações relacionadas ao
          tratamento dos seus dados pessoais, fale com a nossa Encarregada pela
          Proteção de Dados, <Strong>Mariana Albuquerque</Strong>:
        </P>
        <ContactCard
          email="privacidade@tropicalmilhas.com.br"
          phone="(21) 98432-7651"
          address="Av. Rio Branco, 156, Sala 1204, Centro, Rio de Janeiro/RJ"
        />
        <P>
          Você também pode apresentar reclamação à{" "}
          <Strong>Autoridade Nacional de Proteção de Dados (ANPD)</Strong> caso
          entenda que seus direitos não foram adequadamente atendidos.
        </P>
        <Notice>
          Consulte também nossos{" "}
          <Link
            href="/termos-de-uso"
            className="font-semibold text-brand underline-offset-2 hover:underline"
          >
            Termos de Uso
          </Link>{" "}
          para entender as regras de utilização da plataforma.
        </Notice>
      </>
    ),
  },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <LegalPageLayout
      badge="Privacidade & LGPD"
      title={
        <>
          Política de{" "}
          <span className="text-brand">Privacidade</span>
        </>
      }
      description="Transparência total sobre como tratamos seus dados pessoais. Aqui você entende o que coletamos, por que coletamos e quais são os seus direitos garantidos pela LGPD."
      lastUpdated={LAST_UPDATED}
      sections={sections}
    />
  );
}
