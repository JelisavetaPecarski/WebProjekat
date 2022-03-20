export class Predmet
{
    constructor(id,naziv,objekat)
    {
        this.ID=id;
        this.naziv=naziv;
        this.Objekat=objekat;
    }
    PremestiPredmet(objekat)
    {
        this.Objekat=objekat;
    }
}