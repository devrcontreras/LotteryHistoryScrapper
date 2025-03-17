import { error } from 'console';
import * as lotoService from './services/lotoService.js';

async function main(){

    await lotoService.getLoto(2025);
    
}

main().catch(error);