import { Ionicons } from '@expo/vector-icons';
import { type Href, router, usePathname } from 'expo-router';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAplicativo } from '@/contextos/aplicativo-contexto';

type ItemMenu = {
  rotulo: string;
  icone: keyof typeof Ionicons.glyphMap;
  rota: Href;
};

const itensMenu: ItemMenu[] = [
  { rotulo: 'Início', icone: 'home-outline', rota: '/dashboard' },
  { rotulo: 'Extrato Mensal', icone: 'document-text-outline', rota: '/extrato' },
  { rotulo: 'Fontes de Renda', icone: 'wallet-outline', rota: '/fontes-renda' },
  { rotulo: 'Minhas Reservas', icone: 'shield-checkmark-outline', rota: '/reservas' },
  { rotulo: 'Contas a Pagar', icone: 'receipt-outline', rota: '/contas-a-pagar' },
  { rotulo: 'Calculadora de Tempo', icone: 'time-outline', rota: '/tempo' },
  { rotulo: 'Configurações', icone: 'settings-outline', rota: '/perfil' },
];

type PropriedadesMenuLateralAplicativo = {
  visivel: boolean;
  aoFechar: () => void;
};

export function MenuLateralAplicativo({
  visivel,
  aoFechar,
}: PropriedadesMenuLateralAplicativo) {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { usuario } = useAplicativo();

  function navegarPara(rota: Href) {
    aoFechar();
    router.replace(rota);
  }

  return (
    <Modal animationType="fade" onRequestClose={aoFechar} transparent visible={visivel}>
      <View style={estilos.overlay}>
        <View
          style={[
            estilos.painel,
            {
              paddingTop: Math.max(insets.top, 16),
              paddingBottom: Math.max(insets.bottom, 18),
            },
          ]}>
          <View style={estilos.cabecalho}>
            <View style={estilos.avatar}>
              <Ionicons color="#F6C8A6" name="person" size={20} />
            </View>
            <View style={estilos.areaUsuario}>
              <Text numberOfLines={1} style={estilos.nomeUsuario}>
                {usuario.nome}
              </Text>
              <Text style={estilos.seloUsuario}>Premium</Text>
            </View>
          </View>

          <View style={estilos.listaItens}>
            {itensMenu.map((item) => {
              const estaAtivo = pathname === item.rota;

              return (
                <Pressable
                  key={item.rotulo}
                  onPress={() => navegarPara(item.rota)}
                  style={[estilos.itemMenu, estaAtivo && estilos.itemMenuAtivo]}>
                  <Ionicons
                    color={estaAtivo ? '#6200EE' : '#475569'}
                    name={item.icone}
                    size={18}
                  />
                  <Text
                    style={[
                      estilos.textoItemMenu,
                      estaAtivo && estilos.textoItemMenuAtivo,
                    ]}>
                    {item.rotulo}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={estilos.rodape}>Bolso Inteligente</Text>
        </View>

        <Pressable onPress={aoFechar} style={estilos.fundo} />
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(17, 24, 39, 0.16)',
  },
  fundo: {
    flex: 1,
  },
  painel: {
    width: '82%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 16,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: '#1F2937',
    borderWidth: 2,
    borderColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  areaUsuario: {
    flex: 1,
  },
  nomeUsuario: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 2,
  },
  seloUsuario: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6200EE',
  },
  listaItens: {
    gap: 6,
  },
  itemMenu: {
    minHeight: 44,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
  },
  itemMenuAtivo: {
    backgroundColor: '#F5F3FF',
  },
  textoItemMenu: {
    fontSize: 15,
    lineHeight: 19,
    color: '#334155',
  },
  textoItemMenuAtivo: {
    color: '#6200EE',
    fontWeight: '700',
  },
  rodape: {
    marginTop: 'auto',
    fontSize: 12,
    lineHeight: 16,
    color: '#71717A',
    textAlign: 'center',
  },
});
