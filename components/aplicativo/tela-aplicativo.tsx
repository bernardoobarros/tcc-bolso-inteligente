import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BarraNavegacao } from '@/components/aplicativo/barra-navegacao';

type AbaAtiva = 'dashboard' | 'extrato' | 'tempo' | 'perfil';

type PropriedadesTelaAplicativo = {
  abaAtiva: AbaAtiva;
  children: ReactNode;
  rolavel?: boolean;
};

export function TelaAplicativo({
  abaAtiva,
  children,
  rolavel = true,
}: PropriedadesTelaAplicativo) {
  return (
    <SafeAreaView edges={['top']} style={estilos.areaSegura}>
      {rolavel ? (
        <ScrollView
          contentContainerStyle={estilos.conteudoRolavel}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={estilos.conteudoFixo}>{children}</View>
      )}

      <BarraNavegacao abaAtiva={abaAtiva} />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  conteudoRolavel: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 16,
  },
  conteudoFixo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
});
