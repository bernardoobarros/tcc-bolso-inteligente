import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BarraNavegacao } from '@/components/aplicativo/barra-navegacao';
import { MenuLateralAplicativo } from '@/components/aplicativo/menu-lateral-aplicativo';

type AbaAtiva = 'dashboard' | 'extrato' | 'tempo' | 'perfil';

type PropriedadesTelaAplicativo = {
  abaAtiva: AbaAtiva;
  children: ReactNode;
  rolavel?: boolean;
};

type ContextoMenuAplicativo = {
  abrirMenu: () => void;
};

const menuAplicativoContexto = createContext<ContextoMenuAplicativo | null>(null);

export function TelaAplicativo({
  abaAtiva,
  children,
  rolavel = true,
}: PropriedadesTelaAplicativo) {
  const [menuAberto, setMenuAberto] = useState(false);
  const valorContexto = useMemo(
    () => ({
      abrirMenu: () => setMenuAberto(true),
    }),
    [],
  );

  return (
    <menuAplicativoContexto.Provider value={valorContexto}>
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
        <MenuLateralAplicativo
          aoFechar={() => setMenuAberto(false)}
          visivel={menuAberto}
        />
      </SafeAreaView>
    </menuAplicativoContexto.Provider>
  );
}

export function useMenuAplicativo() {
  const contexto = useContext(menuAplicativoContexto);

  if (!contexto) {
    throw new Error('useMenuAplicativo precisa ser usado dentro de TelaAplicativo.');
  }

  return contexto;
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
