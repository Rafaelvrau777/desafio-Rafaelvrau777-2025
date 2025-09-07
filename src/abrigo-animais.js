export class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { especie: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { especie: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { especie: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { especie: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { especie: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { especie: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
    };

    this.brinquedosValidos = new Set([
      'RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'
    ]);
  }

  _contémSequência(pessoaBrinquedos, animalBrinquedos) {
    let i = 0;
    for (const brinquedo of pessoaBrinquedos) {
      if (brinquedo === animalBrinquedos[i]) {
        i++;
        if (i === animalBrinquedos.length) return true;
      }
    }
    return false;
  }

  _verificaPessoa(pessoaBrinquedos, animal) {
    const animalInfo = this.animais[animal];
    if (animal === 'Loco') {
      return true;
    }
    if (animalInfo.especie === 'gato') {
      // Para gatos, a lista da pessoa deve ser exatamente igual à lista do gato
      if (pessoaBrinquedos.length !== animalInfo.brinquedos.length) return false;
      for (let i = 0; i < pessoaBrinquedos.length; i++) {
        if (pessoaBrinquedos[i] !== animalInfo.brinquedos[i]) return false;
      }
      return true;
    }
    // Para outros animais, verifica se animal.brinquedos é subsequência de pessoaBrinquedos
    return this._contémSequência(pessoaBrinquedos, animalInfo.brinquedos);
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = brinquedosPessoa1.split(',').map(b => b.trim().toUpperCase());
    const brinquedos2 = brinquedosPessoa2.split(',').map(b => b.trim().toUpperCase());
    const animaisOrdem = ordemAnimais.split(',').map(a => a.trim());

    if (new Set(brinquedos1).size !== brinquedos1.length) {
      return { erro: 'Brinquedo inválido' };
    }
    if (brinquedos1.some(b => !this.brinquedosValidos.has(b))) {
      return { erro: 'Brinquedo inválido' };
    }

    if (new Set(brinquedos2).size !== brinquedos2.length) {
      return { erro: 'Brinquedo inválido' };
    }
    if (brinquedos2.some(b => !this.brinquedosValidos.has(b))) {
      return { erro: 'Brinquedo inválido' };
    }

    if (new Set(animaisOrdem).size !== animaisOrdem.length) {
      return { erro: 'Animal inválido' };
    }
    for (const animal of animaisOrdem) {
      if (!this.animais[animal]) {
        return { erro: 'Animal inválido' };
      }
    }

    const animaisPessoa1 = [];
    const animaisPessoa2 = [];
    const resultado = [];

    const temOutroAnimal = (listaAnimais, atual) => {
      return listaAnimais.some(a => a !== atual);
    };

    for (const animal of animaisOrdem) {
      const pessoa1Atende = this._verificaPessoa(brinquedos1, animal);
      const pessoa2Atende = this._verificaPessoa(brinquedos2, animal);

      if (pessoa1Atende && pessoa2Atende) {
        resultado.push(`${animal} - abrigo`);
        continue;
      }

      if (!pessoa1Atende && !pessoa2Atende) {
        resultado.push(`${animal} - abrigo`);
        continue;
      }

      if (pessoa1Atende) {
        if (animaisPessoa1.length >= 3) {
          resultado.push(`${animal} - abrigo`);
          continue;
        }
        if (animal === 'Loco' && !temOutroAnimal(animaisPessoa1, 'Loco')) {
          resultado.push(`${animal} - abrigo`);
          continue;
        }
        animaisPessoa1.push(animal);
        resultado.push(`${animal} - pessoa 1`);
        continue;
      }

      if (pessoa2Atende) {
        if (animaisPessoa2.length >= 3) {
          resultado.push(`${animal} - abrigo`);
          continue;
        }
        if (animal === 'Loco' && !temOutroAnimal(animaisPessoa2, 'Loco')) {
          resultado.push(`${animal} - abrigo`);
          continue;
        }
        animaisPessoa2.push(animal);
        resultado.push(`${animal} - pessoa 2`);
        continue;
      }
    }

    resultado.sort((a, b) => {
      const nomeA = a.split(' - ')[0].toUpperCase();
      const nomeB = b.split(' - ')[0].toUpperCase();
      if (nomeA < nomeB) return -1;
      if (nomeA > nomeB) return 1;
      return 0;
    });

    return { lista: resultado };
  }
}