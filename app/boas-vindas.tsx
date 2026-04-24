import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TelaBoasVindas() {
  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.brilhoSuperior} />
      <View style={estilos.brilhoInferior} />

      <View style={estilos.container}>
        <View style={estilos.secaoLogo}>
          <View style={estilos.cartaoLogo}>
            <Ionicons color="#ffffff" name="analytics-outline" size={34} />
          </View>
          <Text style={estilos.marca}>Bolso Inteligente</Text>
        </View>

        <View style={estilos.areaHeroi}>
          <View style={estilos.cartaoExterno}>
            <View style={estilos.cartaoInterno}>
              <View style={estilos.cabecalhoHeroi}>
                <View>
                  <Text style={estilos.rotuloHeroi}>PATRIMÔNIO TOTAL</Text>
                  <Text style={estilos.valorHeroi}>R$ 12.450,00</Text>
                </View>
                <View style={estilos.circuloIconeGrafico}>
                  <Ionicons
                    color="#6200EE"
                    name="trending-up-outline"
                    size={18}
                  />
                </View>
              </View>

              <View style={estilos.areaGrafico}>
                <View style={[estilos.barra, estilos.barraSuaveBaixa]} />
                <View style={[estilos.barra, estilos.barraSuaveAlta]} />
                <View style={[estilos.barra, estilos.barraClara]} />
                <View style={[estilos.barra, estilos.barraMedia]} />
                <View style={[estilos.barra, estilos.barraForte]} />
              </View>
            </View>
          </View>

          <View style={estilos.cartaoMeta}>
            <View style={estilos.circuloIconeMeta}>
              <Ionicons color="#9A4D2F" name="wallet-outline" size={14} />
            </View>
            <View>
              <Text style={estilos.rotuloMeta}>Meta Alcançada</Text>
              <Text style={estilos.valorMeta}>Viagem 2025</Text>
            </View>
          </View>
        </View>

        <View style={estilos.secaoTexto}>
          <Text style={estilos.titulo}>
            Suas finanças em <Text style={estilos.tituloDestaque}>foco</Text>.
          </Text>
          <Text style={estilos.subtitulo}>
            Organize suas finanças com inteligência e conquiste sua liberdade.
          </Text>
        </View>

        <View style={estilos.secaoAcoes}>
          <Pressable
            onPress={() => router.push("/entrar")}
            style={estilos.botaoPrimario}
          >
            <Text style={estilos.textoBotaoPrimario}>Começar agora</Text>
            <Ionicons color="#ffffff" name="chevron-forward" size={16} />
          </Pressable>

          <Pressable
            onPress={() => router.push("/entrar")}
            style={estilos.linkSecundario}
          >
            <Text style={estilos.textoLinkSecundario}>Já tenho conta</Text>
          </Pressable>
        </View>

        <Text style={estilos.rodape}>© 2026 BOLSO INTELIGENTE INC.</Text>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: "#F9F9FB",
  },
  brilhoSuperior: {
    position: "absolute",
    top: -40,
    right: -70,
    width: 220,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(98,0,238,0.05)",
  },
  brilhoInferior: {
    position: "absolute",
    bottom: 10,
    left: -70,
    width: 220,
    height: 160,
    borderRadius: 999,
    backgroundColor: "rgba(179,152,255,0.08)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingTop: 44,
    paddingBottom: 40,
  },
  secaoLogo: {
    alignItems: "center",
    gap: 20,
  },
  cartaoLogo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#6200EE",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-6deg" }],
    shadowColor: "#4800B2",
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  marca: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    color: "#1A1C1D",
    textAlign: "center",
  },
  areaHeroi: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  cartaoExterno: {
    borderRadius: 24,
    backgroundColor: "#F3F3F5",
    padding: 4,
  },
  cartaoInterno: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cabecalhoHeroi: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  rotuloHeroi: {
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.8,
    color: "rgba(73,68,86,0.6)",
  },
  valorHeroi: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "800",
    color: "#1A1C1D",
  },
  circuloIconeGrafico: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#E8E8EA",
    alignItems: "center",
    justifyContent: "center",
  },
  areaGrafico: {
    height: 96,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 40,
    gap: 0,
  },
  barra: {
    flex: 1,
    marginHorizontal: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  barraSuaveBaixa: {
    height: 48,
    backgroundColor: "#E8E8EA",
  },
  barraSuaveAlta: {
    height: 80,
    backgroundColor: "#E8E8EA",
  },
  barraClara: {
    height: 64,
    backgroundColor: "rgba(98,0,238,0.2)",
  },
  barraMedia: {
    height: 96,
    backgroundColor: "rgba(98,0,238,0.4)",
  },
  barraForte: {
    height: 56,
    backgroundColor: "#4800B2",
  },
  cartaoMeta: {
    position: "absolute",
    right: 8,
    bottom: -24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderRadius: 24,
    padding: 17,
    shadowColor: "#1A1C1D",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  circuloIconeMeta: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#FFDBCF",
    alignItems: "center",
    justifyContent: "center",
  },
  rotuloMeta: {
    fontSize: 10,
    lineHeight: 15,
    color: "#494456",
  },
  valorMeta: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    color: "#1A1C1D",
  },
  secaoTexto: {
    alignItems: "center",
    gap: 16,
    marginTop: 48,
  },
  titulo: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: "#1A1C1D",
    textAlign: "center",
  },
  tituloDestaque: {
    color: "#4800B2",
  },
  subtitulo: {
    maxWidth: 220,
    fontSize: 16,
    lineHeight: 26,
    color: "#494456",
    textAlign: "center",
  },
  secaoAcoes: {
    width: "100%",
    gap: 24,
  },
  botaoPrimario: {
    height: 56,
    borderRadius: 999,
    backgroundColor: "#6200EE",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: "#4800B2",
    shadowOpacity: 0.22,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  textoBotaoPrimario: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  linkSecundario: {
    alignSelf: "center",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(72,0,178,0.2)",
    paddingTop: 8,
    paddingBottom: 10,
  },
  textoLinkSecundario: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#1A1C1D",
  },
  rodape: {
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
    color: "rgba(73,68,86,0.4)",
    textAlign: "center",
  },
});
