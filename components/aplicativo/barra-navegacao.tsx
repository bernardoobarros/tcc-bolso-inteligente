import { Ionicons } from "@expo/vector-icons";
import { type Href, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AbaAtiva = "dashboard" | "extrato" | "tempo" | "perfil";

type ItemNavegacao = {
  rota: Href;
  rotulo: string;
  icone: keyof typeof Ionicons.glyphMap;
  chave: AbaAtiva;
};

const itensNavegacao: ItemNavegacao[] = [
  {
    rota: "/dashboard",
    rotulo: "INÍCIO",
    icone: "grid-outline",
    chave: "dashboard",
  },
  {
    rota: "/extrato",
    rotulo: "EXTRATO",
    icone: "document-text-outline",
    chave: "extrato",
  },
  { rota: "/tempo", rotulo: "TEMPO", icone: "time-outline", chave: "tempo" },
  {
    rota: "/perfil",
    rotulo: "PERFIL",
    icone: "person-outline",
    chave: "perfil",
  },
];

type PropriedadesBarraNavegacao = {
  abaAtiva: AbaAtiva;
};

export function BarraNavegacao({ abaAtiva }: PropriedadesBarraNavegacao) {
  const insets = useSafeAreaInsets();
  const [menuAberto, setMenuAberto] = useState(false);
  const progressoAnimacao = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(progressoAnimacao, {
      toValue: menuAberto ? 1 : 0,
      useNativeDriver: true,
      friction: 7,
      tension: 90,
    }).start();
  }, [menuAberto, progressoAnimacao]);

  const rotacaoBotao = {
    transform: [
      {
        rotate: progressoAnimacao.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
      {
        scale: progressoAnimacao.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.96],
        }),
      },
    ],
  };

  const animacaoRenda = {
    opacity: progressoAnimacao,
    transform: [
      {
        translateY: progressoAnimacao.interpolate({
          inputRange: [0, 1],
          outputRange: [26, 0],
        }),
      },
      {
        scale: progressoAnimacao.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1],
        }),
      },
    ],
  };

  const animacaoDespesa = {
    opacity: progressoAnimacao,
    transform: [
      {
        translateY: progressoAnimacao.interpolate({
          inputRange: [0, 1],
          outputRange: [38, 0],
        }),
      },
      {
        scale: progressoAnimacao.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1],
        }),
      },
    ],
  };

  function abrirTela(rota: Href) {
    setMenuAberto(false);
    router.push(rota);
  }

  return (
    <View
      style={[estilos.container, { paddingBottom: Math.max(insets.bottom, 8) }]}
    >
      <View
        pointerEvents={menuAberto ? "auto" : "none"}
        style={[estilos.areaAcoes, { bottom: Math.max(insets.bottom, 8) + 84 }]}
      >
        <Animated.View style={[estilos.linhaAcao, animacaoRenda]}>
          <Pressable
            onPress={() => abrirTela("/nova-renda")}
            style={estilos.pilulaAcao}
          >
            <Text style={[estilos.textoAcao, estilos.textoAcaoRoxo]}>
              Adicionar Renda
            </Text>
          </Pressable>
          <Pressable
            onPress={() => abrirTela("/nova-renda")}
            style={estilos.iconeAcao}
          >
            <Ionicons color="#5B21B6" name="wallet-outline" size={22} />
          </Pressable>
        </Animated.View>

        <Animated.View style={[estilos.linhaAcao, animacaoDespesa]}>
          <Pressable
            onPress={() => abrirTela("/nova-despesa")}
            style={estilos.pilulaAcao}
          >
            <Text style={estilos.textoAcao}>Adicionar Despesa</Text>
          </Pressable>
          <Pressable
            onPress={() => abrirTela("/nova-despesa")}
            style={estilos.iconeAcao}
          >
            <Ionicons color="#202020" name="cash-outline" size={22} />
          </Pressable>
        </Animated.View>
      </View>

      <View style={estilos.cartao}>
        {itensNavegacao.slice(0, 2).map((item) => (
          <ItemBarra abaAtiva={abaAtiva} item={item} key={item.chave} />
        ))}

        <Pressable
          onPress={() => setMenuAberto((valorAtual) => !valorAtual)}
          style={estilos.botaoCentral}
        >
          <Animated.View style={rotacaoBotao}>
            <Ionicons color="#FFFFFF" name="add" size={28} />
          </Animated.View>
        </Pressable>

        {itensNavegacao.slice(2).map((item) => (
          <ItemBarra abaAtiva={abaAtiva} item={item} key={item.chave} />
        ))}
      </View>
    </View>
  );
}

type PropriedadesItemBarra = {
  item: ItemNavegacao;
  abaAtiva: AbaAtiva;
};

function ItemBarra({ item, abaAtiva }: PropriedadesItemBarra) {
  const estaAtivo = item.chave === abaAtiva;

  return (
    <Pressable onPress={() => router.replace(item.rota)} style={estilos.item}>
      <Ionicons
        color={estaAtivo ? "#6200EE" : "#9CA3AF"}
        name={item.icone}
        size={18}
      />
      <Text style={[estilos.rotulo, estaAtivo && estilos.rotuloAtivo]}>
        {item.rotulo}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  areaAcoes: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 14,
    zIndex: 20,
  },
  linhaAcao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  pilulaAcao: {
    minWidth: 190,
    height: 46,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    shadowColor: "#111827",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  textoAcao: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#202020",
  },
  textoAcaoRoxo: {
    color: "#6200EE",
  },
  iconeAcao: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#111827",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cartao: {
    minHeight: 76,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    shadowColor: "#1A1C1D",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  rotulo: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  rotuloAtivo: {
    color: "#6200EE",
  },
  botaoCentral: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: "#6200EE",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    shadowColor: "#6200EE",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
});
