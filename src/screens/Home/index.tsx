import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState<string>("");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        `Participante ${participantName}`,
        "Já existe um participante na lista com este nome."
      );
    } else {
      setParticipants((prevState) => [...prevState, participantName]);
      setParticipantName("");

      return Alert.alert(
        `Participante ${participantName} Adicionado`,
        "Participante adicionado com sucesso!"
      );
    }
  }
  function handleParticipantRemove(name: string) {
    return Alert.alert(`Remover`, `Remover o participante ${name}?`, [
      {
        text: "OK",
        onPress: () => {
          setParticipants((prevState) => prevState.filter((p) => p !== name));
        },
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Domingos, 30 de Abril de 2023</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />
        <TouchableOpacity onPress={handleParticipantAdd} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant name={item} onRemove={handleParticipantRemove} />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Nenhum participante cadastrado! Adicione participantes a sua lista de
            presença.
          </Text>
        )}
      />
    </View>
  );
}
