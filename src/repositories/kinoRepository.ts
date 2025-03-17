import Kino from "../models/kino.js";
import { getConnection, mssql } from "../database/connectionSQLServer.js";

export async function addKino(kino: Kino){
    
    try{

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("Date", mssql.NVarChar, kino.date)
            .input("Numbers", mssql.NVarChar, kino.numbers)            
            .query("INSERT INTO Kino(Date, Numbers) Values(@Date, @Numbers)");

    }
    catch(error){
        console.error(error);
    }

}
