import { coinEmitter } from './emitters/coin_emitter.js'
import { openDB } from './config/db.js';
import { CREATE_TABLE_BTC_VALUE, DELETE_ALL_ENTRIES, INSERT_BTC_READ, SELECT_AVG_PRICE, SELECT_BTC_ALL_ENTRIES, SELECT_BTC_AMOUNT_ENTRIES } from './config/queries.js';


/**
 * Formatador capaz de formatar um número
 * no padrão de moeda brasileiro.
 */
const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'usd',
})

/**
 * Listener que é acionado toda vez que
 * o coin emitter emite o preço atual
 * do Bitcoin.
*/
const insert = () => {
  console.log('Iniciando leituras...');

  coinEmitter.on('btc_read', async (price) => {
    const db = await openDB();

    // Cria a tabela
    await db.all(CREATE_TABLE_BTC_VALUE);

    // Quantas tuplas a tabela tem
    let sequence = await db.all(SELECT_BTC_AMOUNT_ENTRIES);
    sequence = Object.values(sequence.at(0)).at(0);

    const time = new Date().toISOString()
    const formattedPrice = moneyFormatter.format(price)
    console.log(`Preço do Bitcoin em ${time} -> U$ ${formattedPrice}`)

    /**
     * Abaixo, crie o código necessário para salvar
     * o novo preço lido do Bitcoin na tabela btc_value.
     * Após, crie o código necessário para executar uma
     * consulta na tabela btc_value que retorne o valor
     * médio do Bitcoin desde a primeira leitura.
    */
    const id = sequence + 1;
    await db.run(INSERT_BTC_READ, id, time, price);
  })
}

const select = async () => {
  const db = await openDB();

  let avg = await db.all(SELECT_AVG_PRICE);
  avg = Object.values(avg.at(0)).at(0);
  console.log('A média da cotação do Bitcoin é ', avg);
  
  let results = await db.all(SELECT_BTC_ALL_ENTRIES);
  console.log(results);
}

const truncate = async () => {
  const db = await openDB();
  await db.all(DELETE_ALL_ENTRIES);
  console.log('Todas as tuplas foram deletadas.');
}

/**
 * Observação final:
 *
 * Implemente este script de tal forma que,
 * caso ele seja interrompido e posteriormente
 * executado novamente, não haja problemas
 * de conflito de chaves primárias na tabela
 * btc_value.
 */

// insert();
select();
// truncate();