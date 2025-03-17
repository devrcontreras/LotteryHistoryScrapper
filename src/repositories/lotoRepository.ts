import Loto from "../models/loto.js";
import { getConnection, mssql } from "../database/connectionSQLServer.js";

export async function addLoto(loto: Loto){
    
    try{

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("Date", mssql.NVarChar, loto.date)
            .input("Numbers", mssql.NVarChar, loto.numbers)
            .input("LotoMas", mssql.NVarChar, loto.lotoMas)
            .input("SuperLotoMas", mssql.NVarChar, loto.superLotoMas)
            .query("INSERT INTO Loto(Date, Numbers, LotoMas, SuperLotoMas) Values(@Date, @Numbers, @LotoMas, @SuperLotoMas)");

    }
    catch(error){
        console.error(error);
    }

}
