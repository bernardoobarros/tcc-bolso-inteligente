import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import type {
  CategoriaDespesa,
  CategoriaRenda,
  ContaPagar,
  Despesa,
  EstadoAplicativo,
  Reserva,
  Renda,
} from '@/tipos/aplicativo';

type NovaRenda = {
  descricao: string;
  categoria: CategoriaRenda;
  valorMensal: number;
};

type NovaDespesa = {
  descricao: string;
  categoria: CategoriaDespesa;
  valor: number;
  data: number;
  contaPagamento: string;
  repetir: boolean;
};

type NovaReserva = {
  titulo: string;
  categoria: string;
  valorAtual: number;
  valorMeta: number;
};

type ContextoAplicativo = EstadoAplicativo & {
  adicionarRenda: (dados: NovaRenda) => void;
  adicionarDespesa: (dados: NovaDespesa) => void;
  adicionarReserva: (dados: NovaReserva) => void;
  marcarContaComoPaga: (id: string) => void;
};

const aplicativoContexto = createContext<ContextoAplicativo | null>(null);

export function ProvedorAplicativo({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoAplicativo>(() => criarEstadoInicial());

  const valorContexto = useMemo<ContextoAplicativo>(
    () => ({
      ...estado,
      adicionarRenda: (dados) => {
        setEstado((estadoAtual) => {
          const jaTemPrincipal = estadoAtual.rendas.some(
            (renda) => renda.tipoFonte === 'principal',
          );

          const novaRenda: Renda = {
            id: String(Date.now()),
            descricao: dados.descricao,
            categoria: dados.categoria,
            valorMensal: dados.valorMensal,
            tipoFonte: !jaTemPrincipal && dados.categoria === 'Trabalho' ? 'principal' : 'extra',
            dataCriacao: Date.now(),
          };

          return {
            ...estadoAtual,
            rendas: [novaRenda, ...estadoAtual.rendas],
          };
        });
      },
      adicionarDespesa: (dados) => {
        setEstado((estadoAtual) => {
          const novaDespesa: Despesa = {
            id: String(Date.now()),
            descricao: dados.descricao,
            categoria: dados.categoria,
            valor: dados.valor,
            data: dados.data,
            contaPagamento: dados.contaPagamento,
            repetir: dados.repetir,
          };

          return {
            ...estadoAtual,
            despesas: [novaDespesa, ...estadoAtual.despesas],
          };
        });
      },
      adicionarReserva: (dados) => {
        setEstado((estadoAtual) => {
          const novaReserva: Reserva = {
            id: String(Date.now()),
            titulo: dados.titulo,
            categoria: dados.categoria,
            valorAtual: dados.valorAtual,
            valorMeta: dados.valorMeta,
          };

          return {
            ...estadoAtual,
            reservas: [novaReserva, ...estadoAtual.reservas],
          };
        });
      },
      marcarContaComoPaga: (id) => {
        setEstado((estadoAtual) => ({
          ...estadoAtual,
          contasPagar: estadoAtual.contasPagar.filter((conta) => conta.id !== id),
        }));
      },
    }),
    [estado],
  );

  return (
    <aplicativoContexto.Provider value={valorContexto}>
      {children}
    </aplicativoContexto.Provider>
  );
}

export function useAplicativo() {
  const contexto = useContext(aplicativoContexto);

  if (!contexto) {
    throw new Error('useAplicativo precisa ser usado dentro de ProvedorAplicativo.');
  }

  return contexto;
}

function criarEstadoInicial(): EstadoAplicativo {
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  const rendas: Renda[] = [
    {
      id: 'renda-1',
      descricao: 'Salário CLT',
      categoria: 'Trabalho',
      valorMensal: 7200,
      tipoFonte: 'principal',
      dataCriacao: criarData(hoje, -8, 9, 0),
    },
    {
      id: 'renda-2',
      descricao: 'Projeto Freelance',
      categoria: 'Trabalho',
      valorMensal: 2500,
      tipoFonte: 'extra',
      dataCriacao: criarData(hoje, -4, 20, 0),
    },
    {
      id: 'renda-3',
      descricao: 'Aluguel de Imóvel',
      categoria: 'Negócio',
      valorMensal: 1500,
      tipoFonte: 'principal',
      dataCriacao: criarData(hoje, -6, 8, 0),
    },
    {
      id: 'renda-4',
      descricao: 'Dividendos',
      categoria: 'Investimento',
      valorMensal: 1250,
      tipoFonte: 'extra',
      dataCriacao: criarData(hoje, -2, 10, 15),
    },
  ];

  const despesas: Despesa[] = [
    {
      id: 'despesa-1',
      descricao: 'Aluguel',
      categoria: 'Moradia',
      valor: 950,
      data: criarData(hoje, -7, 9, 0),
      contaPagamento: 'Carteira Principal',
      repetir: true,
    },
    {
      id: 'despesa-2',
      descricao: 'Supermercado Premium',
      categoria: 'Alimentação',
      valor: 420,
      data: criarData(hoje, 0, 14, 20),
      contaPagamento: 'Carteira Principal',
      repetir: false,
    },
    {
      id: 'despesa-3',
      descricao: 'Posto Ipiranga',
      categoria: 'Transporte',
      valor: 310,
      data: criarData(ontem, 0, 18, 45),
      contaPagamento: 'Cartão de Crédito',
      repetir: false,
    },
    {
      id: 'despesa-4',
      descricao: 'Cinema',
      categoria: 'Lazer',
      valor: 210.2,
      data: criarData(ontem, 0, 20, 0),
      contaPagamento: 'Carteira Principal',
      repetir: false,
    },
  ];

  const reservas: Reserva[] = [
    {
      id: 'reserva-1',
      titulo: 'Reserva de Emergência',
      categoria: 'Essencial',
      valorAtual: 8000,
      valorMeta: 10000,
    },
    {
      id: 'reserva-2',
      titulo: 'Viagem 2024',
      categoria: 'Lazer',
      valorAtual: 2250,
      valorMeta: 5000,
    },
    {
      id: 'reserva-3',
      titulo: 'Carro Novo',
      categoria: 'Aquisição',
      valorAtual: 2250,
      valorMeta: 15000,
    },
  ];

  const contasPagar: ContaPagar[] = [
    {
      id: 'conta-1',
      titulo: 'Aluguel',
      descricao: 'Apartamento Centro',
      valor: 1200,
      vencimento: criarData(hoje, 2, 12, 0),
    },
    {
      id: 'conta-2',
      titulo: 'Internet',
      descricao: 'Plano Fibra',
      valor: 120,
      vencimento: criarData(hoje, 5, 12, 0),
    },
    {
      id: 'conta-3',
      titulo: 'Energia',
      descricao: 'Conta residencial',
      valor: 250,
      vencimento: criarData(hoje, -3, 12, 0),
    },
  ];

  return {
    usuario: {
      nome: 'Bernardo Barros',
      email: 'exemplo@email.com',
    },
    rendas,
    despesas,
    reservas,
    contasPagar,
  };
}

function criarData(dataBase: Date, deslocamentoDias: number, hora: number, minuto: number) {
  const data = new Date(dataBase);
  data.setDate(dataBase.getDate() + deslocamentoDias);
  data.setHours(hora, minuto, 0, 0);

  return data.getTime();
}
