import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  match: {
    color: "#80aa00",
    fontWeight: "bold",
    marginRight: 5,
  },
  year: {
    color: "silver",
    marginRight: 5,
  },
  ageContainer: {
    backgroundColor: "#e6e229",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  age: {
    color: "black",
  },
  play: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 3,
    marginVertical: 5,
  },
  playButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  download: {
    backgroundColor: "#2b2b2b",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 3,
    marginVertical: 5,
  },
  downloadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cast: {
    color: "silver",
    marginTop: 12
  },
  creator: {
    color: "silver",
  },
});
export default styles;
