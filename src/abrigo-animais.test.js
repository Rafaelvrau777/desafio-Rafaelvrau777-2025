import { AbrigoAnimais } from "./abrigo-animais.js";

test("caso válido exemplo", () => {
  const abrigo = new AbrigoAnimais();
  const resultado = abrigo.encontraPessoas("RATO,BOLA", "RATO,NOVELO", "Rex,Fofo");
  expect(resultado).toEqual({
    lista: ["Fofo - abrigo", "Rex - pessoa 1"],
  });
});

test("animal inválido", () => {
  const abrigo = new AbrigoAnimais();
  const resultado = abrigo.encontraPessoas("CAIXA,RATO", "RATO,BOLA", "Lulu");
  expect(resultado).toEqual({
    erro: "Animal inválido",
  });
});
