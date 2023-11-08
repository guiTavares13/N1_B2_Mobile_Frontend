import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CompanyContext from "../middlewares/CompanyContext.js";

// Importe a função getCompanyByPk aqui.
import { getCompanyByPk } from "../services/companyApiFunctions.js";

export default function ProductDetail() {
  const route = useRoute();
  const { product } = route.params;
  const navigation = useNavigation();

  const { setCompanyContext } = useContext(CompanyContext);

  // Imagem padrão para quando a URL da imagem for nula
  const defaultImage = "https://via.placeholder.com/150";

  // Cria um estado para armazenar os dados da company
  const [company, setCompany] = useState({});

  // Carrega os dados da company quando o componente é montado
  useEffect(() => {
    async function loadCompany() {
      try {
        const response = await getCompanyByPk(product.company_id);
        if (response.success) {
          setCompany(response.data);
          setCompanyContext(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar dados da empresa:", error);
      }
    }

    loadCompany();
  }, [product.company_id]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Detalhes do Produto" });
  }, [navigation]);

  const handleHirePress = () => {
    // Navegue para a HiringScreen quando o botão Contratar for pressionado
    navigation.navigate("HiringScreen", { product });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Image
          source={{
            uri: product.image_url ? product.image_url : defaultImage,
          }}
          style={styles.image}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>R$ {product.price}</Text>
          <Text style={styles.duration}>{product.duration} dias</Text>

          {company && (
            <>
              <Text style={styles.companyTitle}>Informações da empresa:</Text>
              <Text style={styles.company}>Nome: {company.name}</Text>
              <Text style={styles.address}>Endereço: {company.address}, {company.city} - {company.state}</Text>
              <Text style={styles.phone}>Telefone: {company.phone}</Text>
            </>
          )}

          <TouchableOpacity onPress={handleHirePress} style={styles.hireButton}>
            <Text style={styles.hireButtonText}>Contratar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  image: {
    width: "80%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    marginTop: 16,
    marginBottom: 16,
  },
  detailsContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  companyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    marginBottom: 8,
  },
  hireButton: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 24,
    alignSelf: "center",
  },
  hireButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
