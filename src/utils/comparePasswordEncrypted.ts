import bcrypt from 'bcrypt';

async function comparePasswordEncrypted(passwordEncrypted: string, password: string) {
    const compare = await bcrypt.compare(password, passwordEncrypted);
    console.log(compare, passwordEncrypted)
    return compare;
}

export default comparePasswordEncrypted;