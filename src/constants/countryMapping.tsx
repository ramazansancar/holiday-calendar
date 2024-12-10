const countryMapping = (country: string) => {
    switch (country) {
        case 'DE-BW':
            return 'Almanya Baden-Vürtemberg';
        case 'DE-BY':
            return 'Almanya Bavyera';
        case 'DE-BE':
            return 'Almanya Berlin';
        case 'DE-BB':
            return 'Almanya Brandenburg';
        case 'DE-HB':
            return 'Almanya Bremen';
        case 'DE-HH':
            return 'Almanya Hamburg';
        case 'DE-HE':
            return 'Almanya Hessen';
        case 'DE-MV':
            return 'Almanya Mecklenburg-Vorpommern';
        case 'DE-NI':
            return 'Almanya Aşağı Saksonya';
        case 'DE-NW':
            return 'Almanya Kuzey Ren-Vestfalya';
        case 'DE-RP':
            return 'Almanya Renanya-Palatina';
        case 'DE-SL':
            return 'Almanya Saarland';
        case 'DE-SN':
            return 'Almanya Saksonya';
        case 'DE-ST':
            return 'Almanya Saksonya-Anhalt';
        case 'DE-SH':
            return 'Almanya Schleswig-Holstein';
        case 'DE-TH':
            return 'Almanya Turingen';
        case 'TR':
            return 'Türkiye';

        default:
            return 'Bilinmiyor';
    }
};

export default countryMapping;