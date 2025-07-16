import Kino from "../models/kino.js";
import { getConnection, mssql } from "../database/connectionSQLServer.js";

export async function addKino(kino: Kino){
    
    try{

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("Date", mssql.NVarChar, kino.date)
            .input("Numbers", mssql.NVarChar, kino.numbers)
            .input("Num1", mssql.NVarChar, kino.nums[0])
            .input("Num2", mssql.NVarChar, kino.nums[1])
            .input("Num3", mssql.NVarChar, kino.nums[2])
            .input("Num4", mssql.NVarChar, kino.nums[3])
            .input("Num5", mssql.NVarChar, kino.nums[4])
            .input("Num6", mssql.NVarChar, kino.nums[5])
            .input("Num7", mssql.NVarChar, kino.nums[6])
            .input("Num8", mssql.NVarChar, kino.nums[7])
            .input("Num9", mssql.NVarChar, kino.nums[8])
            .input("Num10", mssql.NVarChar, kino.nums[9])
            .input("Num11", mssql.NVarChar, kino.nums[10])
            .input("Num12", mssql.NVarChar, kino.nums[11])
            .input("Num13", mssql.NVarChar, kino.nums[12])
            .input("Num14", mssql.NVarChar, kino.nums[13])
            .input("Num15", mssql.NVarChar, kino.nums[14])
            .input("Num16", mssql.NVarChar, kino.nums[15])
            .input("Num17", mssql.NVarChar, kino.nums[16])
            .input("Num18", mssql.NVarChar, kino.nums[17])
            .input("Num19", mssql.NVarChar, kino.nums[18])
            .input("Num20", mssql.NVarChar, kino.nums[19])
            .input("day", mssql.Int, kino.day)
            .input("month", mssql.Int, kino.month)
            .input("year", mssql.Int, kino.year)
            .query("INSERT INTO Kino(Date, Numbers, Num1, Num2, Num3, Num4, Num5, Num6, Num7, Num8, Num9, Num10, Num11, Num12, Num13, Num14, Num15, Num16, Num17, Num18, Num19, Num20, Day, Month, Year) Values(@Date, @Numbers, @Num1, @Num2, @Num3, @Num4, @Num5, @Num6, @Num7, @Num8, @Num9, @Num10, @Num11, @Num12, @Num13, @Num14, @Num15, @Num16, @Num17, @Num18, @Num19, @Num20, @Day, @Month, @Year)");

    }
    catch(error){
        console.error(error);
    }

}

export async function getNumberByYear(year:number):Promise<Kino[]>{

    try{

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("year", mssql.Int, year)
            .query<Kino[]>("SELECT Date, Numbers FROM dbo.Kino WHERE Date Like '%' + CAST(@year AS VARCHAR) + '%'");

        return result.recordset;
    }
    catch(error){
        console.error(error);
        return [];
    }
}
