export function formatarMoeda(valor: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor);
}

export function converterTextoEmValor(texto: string) {
  const textoLimpo = texto.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const valor = Number(textoLimpo);

  return Number.isFinite(valor) ? valor : 0;
}

export function formatarDataCurta(timestamp: number) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(timestamp));
}

export function formatarHorario(timestamp: number) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function converterTextoEmData(texto: string) {
  const correspondencia = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!correspondencia) {
    return null;
  }

  const [, diaTexto, mesTexto, anoTexto] = correspondencia;
  const dia = Number(diaTexto);
  const mes = Number(mesTexto) - 1;
  const ano = Number(anoTexto);
  const data = new Date(ano, mes, dia, 12, 0, 0, 0);

  if (
    data.getFullYear() !== ano ||
    data.getMonth() !== mes ||
    data.getDate() !== dia
  ) {
    return null;
  }

  return data.getTime();
}

export function formatarMesCurto(data: Date) {
  const texto = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(data);

  return texto.replace('.', '').replace(/^\w/, (letra) => letra.toUpperCase());
}

export function obterRotuloData(timestamp: number) {
  const data = new Date(timestamp);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  if (ehMesmoDia(data, hoje)) {
    return 'HOJE';
  }

  if (ehMesmoDia(data, ontem)) {
    return 'ONTEM';
  }

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
    .format(data)
    .toUpperCase();

  return `${dia} DE ${mes}`;
}

export function ehMesmoDia(dataA: Date, dataB: Date) {
  return (
    dataA.getFullYear() === dataB.getFullYear() &&
    dataA.getMonth() === dataB.getMonth() &&
    dataA.getDate() === dataB.getDate()
  );
}

export function ehMesmoMes(timestamp: number, dataReferencia: Date) {
  const data = new Date(timestamp);

  return (
    data.getFullYear() === dataReferencia.getFullYear() &&
    data.getMonth() === dataReferencia.getMonth()
  );
}

export function calcularPercentual(valorAtual: number, valorMeta: number) {
  if (valorMeta <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((valorAtual / valorMeta) * 100));
}

export function obterDiasRestantes(vencimento: number) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataVencimento = new Date(vencimento);
  dataVencimento.setHours(0, 0, 0, 0);

  return Math.round((dataVencimento.getTime() - hoje.getTime()) / 86400000);
}
