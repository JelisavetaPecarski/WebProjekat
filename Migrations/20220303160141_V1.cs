using Microsoft.EntityFrameworkCore.Migrations;

namespace Web_projekat.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisniskoIme = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Sifra = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sobe",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sobe", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TipoviObjekataZaSmestanje",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoviObjekataZaSmestanje", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ObjektiZaSmestanje",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Boja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TipID = table.Column<int>(type: "int", nullable: true),
                    SobaID = table.Column<int>(type: "int", nullable: true),
                    KorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjektiZaSmestanje", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ObjektiZaSmestanje_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ObjektiZaSmestanje_Sobe_SobaID",
                        column: x => x.SobaID,
                        principalTable: "Sobe",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ObjektiZaSmestanje_TipoviObjekataZaSmestanje_TipID",
                        column: x => x.TipID,
                        principalTable: "TipoviObjekataZaSmestanje",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Predmeti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    SmestenID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Predmeti", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Predmeti_ObjektiZaSmestanje_SmestenID",
                        column: x => x.SmestenID,
                        principalTable: "ObjektiZaSmestanje",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ObjektiZaSmestanje_KorisnikID",
                table: "ObjektiZaSmestanje",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_ObjektiZaSmestanje_SobaID",
                table: "ObjektiZaSmestanje",
                column: "SobaID");

            migrationBuilder.CreateIndex(
                name: "IX_ObjektiZaSmestanje_TipID",
                table: "ObjektiZaSmestanje",
                column: "TipID");

            migrationBuilder.CreateIndex(
                name: "IX_Predmeti_SmestenID",
                table: "Predmeti",
                column: "SmestenID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Predmeti");

            migrationBuilder.DropTable(
                name: "ObjektiZaSmestanje");

            migrationBuilder.DropTable(
                name: "Korisnici");

            migrationBuilder.DropTable(
                name: "Sobe");

            migrationBuilder.DropTable(
                name: "TipoviObjekataZaSmestanje");
        }
    }
}
