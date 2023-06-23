export const CREATE_TABLE_BTC_VALUE = `
  create table if not exists btc_value (
    id integer primary key,
    read_time text not null,
    price real not null
  )
`

/**
 * Escreva esta consulta
 */
export const INSERT_BTC_READ = `
    INSERT INTO btc_value VALUES (?, ?, ?)
`

/**
 * Escreva esta consulta
 */
export const SELECT_AVG_PRICE = `
    SELECT AVG(B.price) AS media FROM btc_value B
`

/**
 * Escreva esta consulta
 */
export const SELECT_BTC_AMOUNT_ENTRIES = `
    SELECT COUNT(B.id) FROM btc_value B
`

/**
 * Escreva esta consulta
 */
export const SELECT_BTC_ALL_ENTRIES = `
    SELECT * FROM btc_value
`

/**
 * Escreva esta consulta
 */
export const DELETE_ALL_ENTRIES = `
    DELETE FROM btc_value
`