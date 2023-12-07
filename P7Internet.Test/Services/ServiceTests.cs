﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using NUnit.Framework;
using P7Internet.CustomExceptions;
using P7Internet.Requests;
using P7Internet.Services;
using P7Internet.Shared;
using P7Internet.Test.Mocks;
using RichardSzalay.MockHttp;

namespace P7Internet.Test.Services
{
    [TestFixture()]
    public class ServiceTests
    {
        private SallingService _sallingService;
        private ETilbudsAvisService _eTilbudsAvisService;
        private OpenAiServiceMock _openAiService = new OpenAiServiceMock();
        private MockHttpMessageHandler mockHttp = new MockHttpMessageHandler();
        private string _dummyAPIKey = "DummyAPIKey";

        [SetUp]
        public void Setup()
        {
            //Setup mock of HttpClient to avoid unnecessary load on the API's
            var sallingClient = mockHttp.ToHttpClient();
            var etilbudsAvisClient = mockHttp.ToHttpClient();
            _sallingService = new SallingService(_dummyAPIKey, sallingClient);
            _eTilbudsAvisService = new ETilbudsAvisService(_dummyAPIKey, etilbudsAvisClient);
        }

        #region ProductsAndOffersTests

        [Test()]
        public async Task GetSallingOffersSuccess()
        {
            //Arrange
            mockHttp.Clear();
            mockHttp.When("https://api.sallinggroup.com/*").Respond("application/json",
                "{ \"suggestions\": [ { \"id\": \"30271101\", \"prod_id\": \"31835\", \"title\": \"Akvavit\", \"description\": \"Akvavit\", \"img\": \"https://image.prod.iposeninfra.com/bilkaimg.php?pid=31835&imgType=jpeg\", \"link\": \"https://www.bilkatogo.dk/p/31835\", \"price\": 120 }]}");
            var query = "Akvavit";

            //Act
            var products = await _sallingService.GetRelevantProducts(query);

            //Assert
            Assert.IsNotNull(products);
            Assert.IsTrue(products.All(p => p.Name.Contains("Akvavit")));
            Assert.True(products.First().Price == 120);
            Assert.True(products.First().Id == "30271101");
            Assert.True(products.First().Store == "BilkaToGo");
        }

        [Test()]
        public async Task GetSallingOffersFail()
        {
            //Arrange
            mockHttp.When("https://api.sallinggroup.com/*").Respond("application/json", "");
            var query = "Akvavit";
            List<Offer> products = null;

            //Act/Assert
            Assert.CatchAsync<NoProductsFoundException>(
                async () => products = await _sallingService.GetRelevantProducts(query), "No products were fetched");
        }

        [Test()]
        public async Task GetAllOffersSuccess()
        {
            //Arrange
            mockHttp.Clear();
            mockHttp.When(HttpMethod.Post, "https://squid-api.tjek.com/v4/rpc/get_offers").Respond("application/json",
                "{\r\n  \"page_info\": {\r\n    \"last_cursor\": \"b2Zmc2V0OjM=\",\r\n    \"has_next_page\": true\r\n  },\r\n  \"offers\": [\r\n    {\r\n      \"__typename\": \"offer\",\r\n      \"id\": \"x7e1VB2RBBxnVbrZf6qy0\",\r\n      \"name\": \"Brøndums Snaps\",\r\n      \"description\": \"70 cl. Literpris 107,14. Frit valg\",\r\n      \"images\": [\r\n        {\r\n          \"width\": 1000,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fsuperbrugsen%2FOhWYB9JQ%2Foffers%2Fpage-4%2Fbrondums-snaps-13924919.jpg&w=1000&s=b4b093f14683721f2f4f7cd96219d50b\"\r\n        },\r\n        {\r\n          \"width\": 800,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fsuperbrugsen%2FOhWYB9JQ%2Foffers%2Fpage-4%2Fbrondums-snaps-13924919.jpg&w=800&s=4275c0fb5c5f63846596c14ce42e7989\"\r\n        },\r\n        {\r\n          \"width\": 600,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fsuperbrugsen%2FOhWYB9JQ%2Foffers%2Fpage-4%2Fbrondums-snaps-13924919.jpg&w=600&s=aeef85933a0089d5afa6f37592bfa342\"\r\n        },\r\n        {\r\n          \"width\": 300,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fsuperbrugsen%2FOhWYB9JQ%2Foffers%2Fpage-4%2Fbrondums-snaps-13924919.jpg&w=300&s=fd2b105434ad30d21177b20e6711d395\"\r\n        },\r\n        {\r\n          \"width\": 100,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fsuperbrugsen%2FOhWYB9JQ%2Foffers%2Fpage-4%2Fbrondums-snaps-13924919.jpg&w=100&s=43514dc4ffcc5662919f99085c5d9d93\"\r\n        }\r\n      ],\r\n      \"webshop_link\": \"\",\r\n      \"price\": 75,\r\n      \"currency_code\": \"DKK\",\r\n      \"savings\": 0,\r\n      \"piece_count\": {\r\n        \"from\": 1,\r\n        \"to\": 1\r\n      },\r\n      \"unit_symbol\": \"centiliter\",\r\n      \"unit_size\": {\r\n        \"from\": 70,\r\n        \"to\": 70\r\n      },\r\n      \"validity\": {\r\n        \"from\": \"2023-11-09T23:00:00.000Z\",\r\n        \"to\": \"2023-11-23T23:00:00.000Z\"\r\n      },\r\n      \"visible_from\": \"2023-11-07T23:01:00.000Z\",\r\n      \"external_product_ids\": [],\r\n      \"business\": {\r\n        \"__typename\": \"business\",\r\n        \"id\": \"0b1e8\",\r\n        \"name\": \"SuperBrugsen\",\r\n        \"primary_color\": \"#c31314\",\r\n        \"positive_logotypes\": [\r\n          {\r\n            \"width\": 1000,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2RJqrhrHAkrz-KhYh0IZ9&w=1000&s=de179dec70051bf4e4a86c19c9b00187\"\r\n          },\r\n          {\r\n            \"width\": 800,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2RJqrhrHAkrz-KhYh0IZ9&w=800&s=84bed7e5c97f789db53c8b1834007752\"\r\n          },\r\n          {\r\n            \"width\": 600,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2RJqrhrHAkrz-KhYh0IZ9&w=600&s=c3ccdfa2730c1c766d891eac38248611\"\r\n          },\r\n          {\r\n            \"width\": 300,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2RJqrhrHAkrz-KhYh0IZ9&w=300&s=4b73416e7b5ad6338624e2c2ececf012\"\r\n          },\r\n          {\r\n            \"width\": 100,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2RJqrhrHAkrz-KhYh0IZ9&w=100&s=01286a8d59decd409fb586b86026716f\"\r\n          }\r\n        ],\r\n        \"negative_logotypes\": [\r\n          {\r\n            \"width\": 1000,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2glWx9rxXXado5IhGADRT&w=1000&s=eb9a1a0bb4eac42c4378e0e32ec5a1c0\"\r\n          },\r\n          {\r\n            \"width\": 800,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2glWx9rxXXado5IhGADRT&w=800&s=567419327a39c11b58a2095f780bfc04\"\r\n          },\r\n          {\r\n            \"width\": 600,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2glWx9rxXXado5IhGADRT&w=600&s=5f13565d17e11313f9161a6a6f0c2f0e\"\r\n          },\r\n          {\r\n            \"width\": 300,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2glWx9rxXXado5IhGADRT&w=300&s=5c2507c4fe30c5e8820682cd74427d3a\"\r\n          },\r\n          {\r\n            \"width\": 100,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2F2glWx9rxXXado5IhGADRT&w=100&s=3fde568d9fd051e529b0ebc9fce5b396\"\r\n          }\r\n        ],\r\n        \"country_code\": \"DK\",\r\n        \"short_description\": \"Superbrugsen tilbyder altid et stort udvalg og skarpe priser. Se SuperBrugsens aktuelle tilbudsavis og din nærmeste Brugsens åbningstider her.\",\r\n        \"markdown_description\": \"SuperBrugsen er en ægte madbutik. Det er lige netop her du finder den gode smag og den bedste kvalitet til både hverdagen, weekenden og til alle dine festlige begivenheder. SuperBrugsen har fire gange så mange varer, som de mange discount-butikker. De har masser af specialvarer og de dygtigste fagfolk til at vejlede dig igen butikken’s gode tilbud og friske råvare. \\n\\nHvis det hele skal gå stærkt, har de en lang række af færdigretter. Derimod hvis tiden ikke er en faktor, er der en masse lækre råvarer, så du kan lave præcis den ret du har lyst til.\\n\\nSuperBrugsen har altid stærke tilbud, så husk at holde dig opdateret på deres aktuelle tilbudsavis, som du kan finde lige her på eTilbudsavis. \\n \\n**SuperBrugsens historie**\\n\\nSuperBrugsen er en supermarkedskæde, der har været i drift siden midten af 1960'erne. Grundlagt af den danske forretningsmand Hans Christian Sonne, er SuperBrugsen vokset fra en enkelt butik i København til mere end hundrede lokationer i Danmark og Norge. SuperBrugsen har gennem årene holdt sit engagement i at give kunderne kvalitetsprodukter til lave priser.\\n\\nEfter at have etableret sig som førende i supermarked-branchen begyndte SuperBrugsen at ekspandere i hele Danmark i 1972. Denne udvidelse omfattede forskellige nye butikker og serviceydelser såsom bagerier, blomsterbutikker og apoteker i samme bygning.\\n \\n**Stort udvalg af varer i SuperBrugsen**\\n\\nSuperBrugsen er en dansk kæde af supermarkeder, der har specialiseret sig i at levere kvalitetsprodukter til deres kunder. Deres udvalg af varer omfatter friske råvarer, mejeriprodukter, kød og fisk samt forskellige emballerede varer såsom snacks, dåsemad og drikkevarer. Med over 200 butikker i hele Danmark er SuperBrugsen blevet det bedste sted for kvalitetsvarer til en fair pris.\\n\\nKunder kan også finde økologiske fødevarer og specialvarer såsom kosttilskud, babymad og kæledyrsartikler i udvalgte butikker. SuperBrugsens brede udvalg af varer betyder, at shoppere nemt kan finde det, de har brug for, uden at skulle besøge flere lokationer eller søge meget online. Hvad mere er, betyder deres mange placeringer, at kunderne ikke behøver at bruge for meget tid på at rejse fra butik til butik på udkig efter en vare, de måske ikke kan finde andre steder.\\n \\n**Altid gode priser i SuperBrugsen**\\n\\nSuperBrugsen er en dansk detailkæde, der tilbyder kunderne meget for pengene. Med over 200 butikker på landsplan er SuperBrugsen blevet et kendt navn i Danmark og go-to-destinationen for kvalitetsvarer til konkurrencedygtige priser. Kæden er stolt af at have alt fra frisk frugt og grønt til mejeriprodukter, kød og emballerede varer. Plus, shoppere kan altid finde særlige tilbud og kampagner for at få endnu mere valuta for pengene. \\n \\n**SuperBrugsen og kød i særklasse går hånd i hånd**\\n\\nDu kan altid finde et stort udvalg af kød i SuperBrugsens mange butikker. Du kan finde kød af kvæg, der har græsset i flok under åben himmel. Kun de bedste udskæringer får lov til at modne i ca. seks uger, indtil kødet næsten smelter på tungen. Resultatet er et altid mørt stykke oksekød med saft og kraft og en farve, som alle vil kunne sætte pris på.\\n\\nLammekødet bliver ligeledes produceret under gode forhold. Dyrene har adgang til græs, hø, halm og massevis af frisk luft. Hvilket giver en naturlig mørhed og en rund og mild smag, som du altid finder i SuperBrugsens lammekød\\n.\\nDer er ligeledes danske kalve, som går rundt på frisk halm med ekstra plads, Kødet kan kendes ved sin rosa farve, møre konsistens og den ekstrem lækre smag. Sidst men ikke mindst finder du et stort udvalg af svinekød fra Bornholmergrisen. Det er mere mørt, da det har modnet i 3 dage. Desuden har kødet en god fedtmarmorering, hvilket giver mørt og saftigt kød hver eneste gang.\\n\\nHvis du har nogle spørgsmål til tilberedning, kan du altid spørge de dygtige slagtere i din lokale SuperBrugsen.\\n \\n**Din lokale grønthandler**\\n\\nSuperBrugsens grønthandler gør det altid nemt for dig at finde frisk frugt og grønt, uanset hvor travlt du har eller hvor i landet du bor - her finder du nemlig altid et stort udvalg af frugt og grønt. Du finder både smagfulde sæsonvarer eller lokale, økologiske varer. Du kan altid holde dig opdateret på, hvilke friske sæsonvarer du kan finde i din lokale butik med SuperBrugsen tilbudsavis. SuperBrugsen tilbudsavis kan du altid finde lige her på eTilbudsavis, hvor vi opdater den hver uge, så du kan holde dig orienteret om de nyeste tilbud.\\n \\n**Vin i særklasse - find din favorit rød, hvid eller rosé**\\n\\nSuperBrugsens vinhandel gør det nemt for dig, at finde lige præcis den kvalitetsvin, som du skal bruge. Uanset hvor i landet du befinder dig, har du altid adgang til SuperBrugsens store vinudvalg. Du finder altid gode vine, lige meget om du er mest til rød-, hvid- eller rosévin. SuperBrugsens dygtige medarbejdere står altid klar til at vejlede dig igennem det store vinlandskab, så du altid kommer hjem med den rigtige. \\n \\n# **SuperBrugsen åbningstider og deres 235 butikker**\\n\\nSuperBrugsen har hele 235 butikker fordelt over hele Danmark. Hver eneste butik har et stort udvalg, og du er garanteret at finde lige præcis det du mangler. Superbrugsen åbningstider varierer lidt, og det er derfor fordelagtigt at tjekke din lokale SuperBrugsens åbningstider, så du ikke går forgæves.\\n \\n# **Få de nyeste tilbud med SuperBrugsen tilbudsavis**\\n\\nSuperBrugsen kører hele tiden stærke tilbud, som du ikke må gå glip af. Du kan altid holde dig opdateret ved hjælp af deres tilbudsavis. Den aktuelle SuperBrugsen tilbudsavis kan du altid finde lige her på eTilbudsavis. Så sæt den som din favorit og hold dig opdateret uge efter uge efter de bedste tilbud på kød, vin, fisk og meget andet.\",\r\n        \"website_link\": \"http://superbrugsen.dk\",\r\n        \"markets\": [\r\n          {\r\n            \"slug\": \"SuperBrugsen\",\r\n            \"country_code\": \"DK\"\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"__typename\": \"offer\",\r\n      \"id\": \"RCS3apLFR51kMGS51eKnu\",\r\n      \"name\": \"O.P. Anderson økologisk snaps\",\r\n      \"description\": \"70 cl. Gylden eller klar. Pr. liter 121,43\",\r\n      \"images\": [\r\n        {\r\n          \"width\": 1000,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fnetto%2FpFeNrOJ5%2Foffers%2Fpage-8%2Fo-p-anderson-okologisk-snaps-13903191.jpg&w=1000&s=26be212f327f120efd35af764ed30003\"\r\n        },\r\n        {\r\n          \"width\": 800,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fnetto%2FpFeNrOJ5%2Foffers%2Fpage-8%2Fo-p-anderson-okologisk-snaps-13903191.jpg&w=800&s=edc3352522066f88b3a9610c0ebc7cce\"\r\n        },\r\n        {\r\n          \"width\": 600,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fnetto%2FpFeNrOJ5%2Foffers%2Fpage-8%2Fo-p-anderson-okologisk-snaps-13903191.jpg&w=600&s=02f4f38c6736616eafae7b7e653a13c1\"\r\n        },\r\n        {\r\n          \"width\": 300,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fnetto%2FpFeNrOJ5%2Foffers%2Fpage-8%2Fo-p-anderson-okologisk-snaps-13903191.jpg&w=300&s=a206a925c374956550e4dcb90f78707c\"\r\n        },\r\n        {\r\n          \"width\": 100,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Fnetto%2FpFeNrOJ5%2Foffers%2Fpage-8%2Fo-p-anderson-okologisk-snaps-13903191.jpg&w=100&s=ed4b5c6347ff8211519183b715deeb46\"\r\n        }\r\n      ],\r\n      \"webshop_link\": \"\",\r\n      \"price\": 85,\r\n      \"currency_code\": \"DKK\",\r\n      \"savings\": 0,\r\n      \"piece_count\": {\r\n        \"from\": 1,\r\n        \"to\": 1\r\n      },\r\n      \"unit_symbol\": \"centiliter\",\r\n      \"unit_size\": {\r\n        \"from\": 70,\r\n        \"to\": 70\r\n      },\r\n      \"validity\": {\r\n        \"from\": \"2023-11-17T23:00:00.000Z\",\r\n        \"to\": \"2023-11-24T23:00:00.000Z\"\r\n      },\r\n      \"visible_from\": \"2023-11-15T06:00:00.000Z\",\r\n      \"external_product_ids\": [],\r\n      \"business\": {\r\n        \"__typename\": \"business\",\r\n        \"id\": \"9ba51\",\r\n        \"name\": \"Netto\",\r\n        \"primary_color\": \"#FFD950\",\r\n        \"positive_logotypes\": [\r\n          {\r\n            \"width\": 1000,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2Fol71CA924UQJU4tIzJCCK&w=1000&s=84d88c3016f2bf0b12879de75f376e90\"\r\n          },\r\n          {\r\n            \"width\": 800,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2Fol71CA924UQJU4tIzJCCK&w=800&s=5b0f67f2f5ca987bbe172c7db242124d\"\r\n          },\r\n          {\r\n            \"width\": 600,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2Fol71CA924UQJU4tIzJCCK&w=600&s=56ac5cb7071b2b53d84560634ca013a7\"\r\n          },\r\n          {\r\n            \"width\": 300,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2Fol71CA924UQJU4tIzJCCK&w=300&s=107b0b12583fe6f12d8734a1057110c6\"\r\n          },\r\n          {\r\n            \"width\": 100,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2Fol71CA924UQJU4tIzJCCK&w=100&s=906ef556bb64c848d3293acb96f39404\"\r\n          }\r\n        ],\r\n        \"negative_logotypes\": [\r\n          {\r\n            \"width\": 1000,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FVsr7cIHe3BWlk3pxJUshE&w=1000&s=886400dca4859550d29f8e059d15174f\"\r\n          },\r\n          {\r\n            \"width\": 800,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FVsr7cIHe3BWlk3pxJUshE&w=800&s=a4ed511e73356c579d6bf1baba83546f\"\r\n          },\r\n          {\r\n            \"width\": 600,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FVsr7cIHe3BWlk3pxJUshE&w=600&s=cf9f81a8c97c80ad877c89576971e489\"\r\n          },\r\n          {\r\n            \"width\": 300,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FVsr7cIHe3BWlk3pxJUshE&w=300&s=f837edade4b6ecf13b1b89ee73b59417\"\r\n          },\r\n          {\r\n            \"width\": 100,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FVsr7cIHe3BWlk3pxJUshE&w=100&s=4d232f9862dcd8b61321b1f68c7bbdb6\"\r\n          }\r\n        ],\r\n        \"country_code\": \"DK\",\r\n        \"short_description\": \"Netto har altid stærke tilbud. Hold dig opdateret Vi holder dig opdateret på Nettos ugentlige tilbud. Hold dig derfor altid opdateret med deres tilbudsavis lige her.\",\r\n        \"markdown_description\": \"En af danskernes favoritter. Netto kender vi alle - og med mere end 500 butikker fordelt over hele landet er vi sikre på, at du også har gjort dig gode køb og tilbud her. \\nHer kan du udforske det store udvalg af prissikre og kvalitetsorienteret produkter såsom: frugt og grønt, fersk kød, fisk og mange andre dagligvarer produkter.\\n\\nFå et nemt og overskueligt overblik over Nettos seneste tilbud med Netto tilbudsavis. Her er du garanteret både gode priser på faste produkter i sortimentet, men du kan også finde god spotvare på månedens varer. Gør som andre og begynd at finde de tilbud der passer til din hverdag med Netto tilbudsavis. \\n\\n**Nettos historie**\\n\\nNetto er en del af Salling Group, der er ejet af Salling Fondene. Derfor går hele Nettos overskud enten til at skabe bedre indkøbsoplevelser for dig eller tilbage til samfundet i form af donationer til gode formål.\\n\\nDen første Netto butik åbnede på Godthåbsvej d. 1. April 1981. I begyndelsen havde butikken ikke det store udvalg, som vi kender i dag. I dag har Netto dog mere end 500 butikker over hele Danmark, hvor der er det store sortiment, som mange af os ser flere gange om ugen på vores indkøbsture. Netto er dermed også landets største dagligvarekæde.\\n\\n**Find de bedste priser på økologi**\\n\\nNetto var en af de første dagligvarekæder, der for alvor fik de økologiske varer ud til danskerne, og deres udvalg vokser stadig i dag. De har nemlig mere end 380 økologiske varer på hylderne og i kølemontrene, og er den dagligvarekæde, som sælger absolut flest økologiske varer til danskerne hvert år. To år i træk har Netto faktisk vundet Politikens pristjek, som demonstrerer at Netto mener det, når de siger at alle skal have råd til økologi.\\n\\nDet røde danske Ø-mærke og EU’s økologilogo er din garanti for et grundigt kontrolsystem og varer, der holder hvad de lover. Økologiske varer er produceret med respekt for naturen og for eksempel uden sprøjtegift. Derfor smager de måske også som naturen oprindeligt havde tænkt sig. Disse varer kan du finde og fylde kurvene med, da de har massere af dem.\\n\\n**Løgismose er en Netto favorit**\\n\\nSiden 2009 har Løgismose og Netto været på den samme mission: Madoplevelser, der er til at betale. Netto synes nemlig ikke at kvalitet kun skal handle om kaviar og champagne, men om at stille krav til det, vi spiser hver dag. Det er nok derfor at Løgismoses mælk smager af lidt mere. Det er derfor at kaffebønnerne er hentet i Brasilien men ristet efter Løgismoses anvisninger. Det er derfor at deres gourmetkylling er opvokset fritgående i nåleskove for foden af Pyrenæerne. Løgismose produkter er produceret med stolthed, og det kan helt sikkert smages. \\n\\nHver eneste Netto butik har mere end 80 forskellige Løgismose varer på hylderne, og hver eneste af dem er noget helt særligt. Godt håndværk er fundamentet for den gode smag. Det gælder først og fremmest om at vælge de bedste råvarer og aldrig gå på kompromis med produktionen. \\n\\nNår du vælger et Løgismose produkt, kan du altså være helt sikker på at produktet er i orden og udvalgt med omhu. Kravene til leverandører er høje og målet og ambitionen er at hver enkelt Løgismose produkt, skal være den absolut bedste indenfor den givne kategori.\\n\\n**Bagværk i Netto**\\n\\nNetto har et stort udvalg af lækkert bagværk. Hver evig eneste morgen bliver der leveret friskbagte boller, brød og søde sager til alle Netto butikkerne i landet. Dette er til dig der elsker en bolle om morgenen, skal have en snack eller skal hjem og holde brunch for hele familien. Der er noget for enhver smag, da der både er lækkert rugbrød, franskbrød og donuts. Bagværket i Nettos sortiment bliver også tilbudt til alle kunder til en utrolig skarp pris.  Hvis dette lyder som noget for dig, så kig efter bake-off skabene i Netto butikkerne, og udforsk det store udvalg af lækkert bagværk.\\n\\n**Gå ikke glip af Nettos egne mærker**\\n\\nNetto har en lang række af egne mærker som tilbyder kvalitets-dagligvarer til ekstremt stærke priser. Disse egne mærker inkluderer: Næmt, Øgo, Premieur og mange andre. Alle tilbyder et billigere alternativ til hverdagens mærke dagligvare. Disse varer bliver derfor også typisk sat ned, så husk og holde øje med de gode tilbud gennem Netto tilbudsavis.\\n\\n# **Netto åbningstider og deres +500 butikker**\\n\\nNetto har over 500 butikker fordelt rundt i hele Danmark. Alle disse butikker har en ting til fælles: Kvalitet og gode priser. Mange danskere går i netto hver dag, og udforsker de gode tilbud. Skal du ikke også det? Netto åbningstider er som regelt 07-22 i de fleste butikker. Dette kan dog godt variere lidt. Det anbefales derfor at du tjekker din lokale Netto åbningstider herunder, så du ikke går forgæves. \\n\\n# **Find Netto tilbudsavis og deres skarpe tilbud**\\n\\nNetto har hele tiden skarpe tilbud i deres butikker. Husk at holde øje med de ugentlige tilbud, da der er altid er mange penge at spare. Du kan altid få et godt og nemt overblik over de mange jævnlige tilbud i Netto tilbudsavis. Hver uge kan du se alle de nyeste tilbud fra Netto her på siden. Udforsk de mange tilbud og gør som mange andre - spar penge ved at bruge eTilbudsavis til at finde dine tilbud fra Netto.\",\r\n        \"website_link\": \"https://netto.dk/\",\r\n        \"markets\": [\r\n          {\r\n            \"slug\": \"Netto\",\r\n            \"country_code\": \"DK\"\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"__typename\": \"offer\",\r\n      \"id\": \"2B81XjTx37PUU_wlgFXiZ\",\r\n      \"name\": \"Taffel Akvavit\",\r\n      \"description\": \"Note: Maks. 6 | 70 cl. Pr. liter 112,86.\",\r\n      \"images\": [\r\n        {\r\n          \"width\": 1000,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Ffotex%2FNXys8TAu%2Foffers%2Fpage-18%2Ftaffel-akvavit-13922896.jpg&w=1000&s=b67cac7ce9069c661ce512a5c8d20519\"\r\n        },\r\n        {\r\n          \"width\": 800,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Ffotex%2FNXys8TAu%2Foffers%2Fpage-18%2Ftaffel-akvavit-13922896.jpg&w=800&s=d309fe1b66d80667a6b52a4cb65b7a61\"\r\n        },\r\n        {\r\n          \"width\": 600,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Ffotex%2FNXys8TAu%2Foffers%2Fpage-18%2Ftaffel-akvavit-13922896.jpg&w=600&s=8e810bf67dffd46ca060b953e3fa89f3\"\r\n        },\r\n        {\r\n          \"width\": 300,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Ffotex%2FNXys8TAu%2Foffers%2Fpage-18%2Ftaffel-akvavit-13922896.jpg&w=300&s=3a6459a57a00fe59b0db670a08e31731\"\r\n        },\r\n        {\r\n          \"width\": 100,\r\n          \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fraven-production%2Fda_DK%2Ffotex%2FNXys8TAu%2Foffers%2Fpage-18%2Ftaffel-akvavit-13922896.jpg&w=100&s=1ca41364550e9cb3ff8933ec04bfbeb7\"\r\n        }\r\n      ],\r\n      \"webshop_link\": \"\",\r\n      \"price\": 79,\r\n      \"currency_code\": \"DKK\",\r\n      \"savings\": 0,\r\n      \"piece_count\": {\r\n        \"from\": 1,\r\n        \"to\": 1\r\n      },\r\n      \"unit_symbol\": \"centiliter\",\r\n      \"unit_size\": {\r\n        \"from\": 70,\r\n        \"to\": 70\r\n      },\r\n      \"validity\": {\r\n        \"from\": \"2023-11-16T23:00:00.000Z\",\r\n        \"to\": \"2023-11-23T23:00:00.000Z\"\r\n      },\r\n      \"visible_from\": \"2023-11-15T09:00:00.000Z\",\r\n      \"external_product_ids\": [],\r\n      \"business\": {\r\n        \"__typename\": \"business\",\r\n        \"id\": \"bdf5A\",\r\n        \"name\": \"føtex\",\r\n        \"primary_color\": \"#1d2f54\",\r\n        \"positive_logotypes\": [\r\n          {\r\n            \"width\": 1000,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FaUchSAqn9T_7L7QJVRRP0&w=1000&s=7a56547324d9b5db929acee084fe8545\"\r\n          },\r\n          {\r\n            \"width\": 800,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FaUchSAqn9T_7L7QJVRRP0&w=800&s=c1cd141dad38307f979742f57b249fc5\"\r\n          },\r\n          {\r\n            \"width\": 600,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FaUchSAqn9T_7L7QJVRRP0&w=600&s=b2124b3cca3948cdf060633697b9866d\"\r\n          },\r\n          {\r\n            \"width\": 300,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FaUchSAqn9T_7L7QJVRRP0&w=300&s=b8d9a7b82e29592785d9feb927a9e00f\"\r\n          },\r\n          {\r\n            \"width\": 100,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FaUchSAqn9T_7L7QJVRRP0&w=100&s=dbb1b371fbfd8c3fd94284e8b6435ada\"\r\n          }\r\n        ],\r\n        \"negative_logotypes\": [\r\n          {\r\n            \"width\": 1000,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FXUt1ERzl_G-nd2STNi4SZ&w=1000&s=bb92c55035d6094819267df78514c2ab\"\r\n          },\r\n          {\r\n            \"width\": 800,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FXUt1ERzl_G-nd2STNi4SZ&w=800&s=95c63e2fe27f6466a30ba10f1d67f7fe\"\r\n          },\r\n          {\r\n            \"width\": 600,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FXUt1ERzl_G-nd2STNi4SZ&w=600&s=6cefbc65f1c83112364813e4d64379f0\"\r\n          },\r\n          {\r\n            \"width\": 300,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FXUt1ERzl_G-nd2STNi4SZ&w=300&s=54a2802e4d5da63fe326d11e1448bc2e\"\r\n          },\r\n          {\r\n            \"width\": 100,\r\n            \"url\": \"https://image-transformer-api.tjek.com/?u=s3%3A%2F%2Fsgn-prd-assets%2Fuploads%2FXUt1ERzl_G-nd2STNi4SZ&w=100&s=daef9bf1ae9f9cd20d2da3917a01f4fc\"\r\n          }\r\n        ],\r\n        \"country_code\": \"DK\",\r\n        \"short_description\": \"Hos føtex har de et stort udvalg af mange forskellige typer varer, og der er altid gode tilbud at finde. Find den nyeste tilbudsavis her.\",\r\n        \"markdown_description\": \"Hos føtex er kvalitet aldrig udsolgt. føtex samarbejder med de bedste leverandører, så de altid kan tilbyde dig det største udvalg af de bedste kvalitetsvarer. føtex vil gøre det så nemt som overhovedet muligt for dig, når du er nede og handle. Butikkerne er fyldt med dygtige ansatte, som du altid kan spørge om hjælp til alt. \\nUdover dette har de mange gode tilbud jævnligt, som du ikke vil gå glip af. Find altid den nyeste tilbudsavis fra føtex lige her på eTilbudsavis.\\n\\n**Historien om føtex**\\n\\nføtex har en lang historie og den startede helt tilbage til dengang hvor telefonerne var med drejeskive og charterferie var det nye. Dengang åbnede Herman Salling den første føtex i Aarhus. Hans far var også købmand, så købmandssansen var i blodet på den unge Herman. Grundlæggeren adskilte sig fra andre supermarkeder med en nytænkende ide, nemlig at danskerne skulle kunne klare alle familiers indkøb under et tag. Det er netop også sådan vi kender føtex i dag, så konceptet har overlevet testen af tid. \\nOm du er vokset op med en føtex eller ej, så kan du mærke grundlæggerens arv, nemlig at det ikke kun er fødevarer man finder i supermarkeder, som Herman Salling var katalysatoren for.\\n\\n## **Altid et stort udvalg i føtex**\\n\\nI føtex finder du altid et stort udvalg af alt du kunne tænke dig. Lige fra frugt og grønt til tøj.\\nføtex har et enormt stort udvalg af fødevarer. En stor frugt- og grøntafdeling med alle de friske frugter og grøntsager du har brug for. Alt andet til din madlavning kan også findes i føtex, og med det menes der ALT. Både gryder, pander, paletknive, knive og så selvfølgelig også alle de fødevare du har lyst til. \\nUanset hvad du går og mangler, har føtex det du kigger efter.\\n\\n## **Ansvarlige varer i føtex**\\n\\nføtex tager stort ansvar og er helt bevidst om at tage ansvar om at sikre kvaliteten, så du og alle kan handle ind med ro i maven. føtex giver dig selvfølgelig et væld af muligheder med deres store sortiment, men der skal være noget til alle, om du går meget op i økologi eller ikke gør det. føtex har derfor flere danske og lokale leverandører i butikken. De har desuden også mere end 1500 økologiske varer på hylderne. Du kan altså helt selv vælge hvad du er til - der er noget for alle!\\nføtex har også været med til at udvikle dyrevelfærdsmærket, så dyrevelfærden er nemmere at gennemskue når du står ved de forskellige kølediske. \\nDe Danske Familiegårde er også en samarbejdspartner for føtex, hvor de prøver at øge kendskab til kyllingers velfærd. Hvis økologi er vigtigt for dig, kan du finde det overalt i føtex til gode priser.\\n\\n## **Frisk brød fra føtex**\\n\\nHos føtex kan du altid få helt frisk og lækkert brød og bagværk fra deres bager. Hver enkelt brød får masser af kærlighed, så det smager sit allerbedste når det ender hjemme hos dig. Føtex har en række af forskellige brød. Her kan bl.a. nævnes deres lækre rugbrød og franskbrød som er meget populært. Lige meget hvilken smag du har, er der er brød for dig. Det gælder, om du så er til smørrebrød, hvortil der skal bruges et godt stykke rugbrød eller om du gerne vil have en god skive franskbrød til brunchbordet.\\n\\n# **Føtex butikker og Føtex åbningstider**\\n\\nføtex har 107 butikker fordelt over hele Danmark. Alle butikker har det brede sortiment, som vi kender og elsker. Chancen for at der ligger en føtex butik tæt på dig, er heldigvis stor. \\nÅbningstiderne er 07-21, dog anbefales det altid at tjekke din lokale føtex butik herunder, så du ikke tager derind forgæves. Udforsk det store udvalg og find de bedste tilbud.\\n\\n# **Føtex tilbud og Føtex tilbudsavis**\\n\\nføtex fører mange tilbud jævnligt, og der er altid penge at spare hver evig eneste uge. Husk at hold dig opdateret med de mange tilbud med en føtex tilbudsavis, også kaldet føtex avis. Kom i gang med at spare penge og find altid den nyeste føtex tilbudsavis lige her på eTilbudsavis.\",\r\n        \"website_link\": \"http://foetex.dk/\",\r\n        \"markets\": [\r\n          {\r\n            \"slug\": \"fotex\",\r\n            \"country_code\": \"DK\"\r\n          }\r\n        ]\r\n      }\r\n    }\r\n  ]\r\n}");
            OfferRequest request = new OfferRequest()
            {
                Lat = 55.212391, Long = 10.035490, Pagesize = 3, Radius = 4500, SearchTerm = "Snaps", Upcoming = "true"
            };

            //Act
            var offers = await _eTilbudsAvisService.GetAllOffers(request);

            //Assert
            Assert.IsNotNull(offers);
            Assert.IsTrue(offers.All(p =>
                p.Name.Contains("Snaps") || p.Name.Contains("Akvavit") || p.Name.Contains("akvavit") ||
                p.Name.Contains("snaps")));
            Assert.IsTrue(offers.Count() == 3);
        }

        [Test()]
        public async Task GetAllOffersFail()
        {
            //Arrange
            mockHttp.Clear();
            mockHttp.When(HttpMethod.Post, "https://squid-api.tjek.com/v4/rpc/get_offers")
                .Respond("application/json", "");
            OfferRequest request = new OfferRequest()
            {
                Lat = 55.212391, Long = 10.035490, Pagesize = 3, Radius = 4500, SearchTerm = "Snaps", Upcoming = "true"
            };

            //Act
            IList<Offer> offers = null;

            //Assert

            Assert.CatchAsync<NullReferenceException>(async () => await _eTilbudsAvisService.GetAllOffers(request));
        }

        #endregion

        #region RecipeTests

        [Test]
        public async Task ComposePromptSuccess()
        {
            //Arrange
            var recipeRequest = new RecipeRequest(Guid.NewGuid(), "test-token",
                new List<string> { "kylling", "julebryg", "hestebønner" }, 2, new List<string> { "kartoffel", "løg" },
                new List<string> { "vegansk" }, 4);
            var checkPrompt =
                @"Jeg vil gerne have 2 opskrifter med disse ingredienser kylling, julebryg, hestebønner uden disse ingredienser kartoffel,løg der er vegansk til 4 personer";
            //Act
            var prompt = _openAiService.ComposePromptFromRecipeRequest(recipeRequest);

            //Assert
            Assert.AreEqual(checkPrompt, prompt);
        }

        [Test]
        public async Task ComposePromptFail()
        {
            //Arrange
            var recipeRequest = new RecipeRequest(Guid.NewGuid(), "test-token",
                new List<string>(), 2, new List<string>(),
                new List<string>(), 4);
            var checkPrompt =
                @"Jeg vil gerne have 2 opskrifter med disse ingredienser kylling, julebryg, hestebønner uden disse ingredienser kartoffel,løg der er vegansk til 4 personer";
            //Act
            var prompt = _openAiService.ComposePromptFromRecipeRequest(recipeRequest);

            //Assert
            Assert.AreNotEqual(checkPrompt, prompt);
        }

        #endregion
    }
}