export type CategoriaRenda = 'Trabalho' | 'Investimento' | 'Negócio' | 'Outros';

export type CategoriaDespesa =
  | 'Moradia'
  | 'Alimentação'
  | 'Transporte'
  | 'Lazer'
  | 'Compras'
  | 'Outros';

export type TipoFonteRenda = 'principal' | 'extra';

export type Renda = {
  id: string;
  descricao: string;
  categoria: CategoriaRenda;
  valorMensal: number;
  tipoFonte: TipoFonteRenda;
  dataCriacao: number;
};

export type Despesa = {
  id: string;
  descricao: string;
  categoria: CategoriaDespesa;
  valor: number;
  data: number;
  contaPagamento: string;
  repetir: boolean;
};

export type Reserva = {
  id: string;
  titulo: string;
  categoria: string;
  valorAtual: number;
  valorMeta: number;
};

export type ContaPagar = {
  id: string;
  titulo: string;
  descricao: string;
  valor: number;
  vencimento: number;
};

export type UsuarioAplicativo = {
  nome: string;
  email: string;
};

export type EstadoAplicativo = {
  usuario: UsuarioAplicativo;
  rendas: Renda[];
  despesas: Despesa[];
  reservas: Reserva[];
  contasPagar: ContaPagar[];
};
