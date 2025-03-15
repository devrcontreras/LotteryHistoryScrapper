import mssql from 'mssql';

const connectionSetting = {
    server: "localhost",
    database: "loto",
    user: "sa",
    password: "Db123*1@7869",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export async function getConnection(){

    try{
        return await mssql.connect(connectionSetting);
    }
    catch(error){
        console.error(error);
    }
}

export { mssql };