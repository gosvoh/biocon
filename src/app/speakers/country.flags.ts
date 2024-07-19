interface FlagMap {
  [key: string]: string;
}

const NoFlag = "https://www.svgrepo.com/show/398539/unknown-flag.svg";

const flags: FlagMap = {
  Afghanistan:
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Afghanistan.svg",
  Albania:
    "https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg",
  Algeria:
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg",
  Andorra:
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg",
  Angola:
    "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg",
  "Antigua and Barbuda":
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Antigua_and_Barbuda.svg",
  Argentina:
    "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
  Armenia:
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg",
  Australia:
    "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
  Austria:
    "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg",
  Azerbaijan:
    "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg",
  Bahamas:
    "https://upload.wikimedia.org/wikipedia/commons/9/93/Flag_of_the_Bahamas.svg",
  Bahrain:
    "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Bahrain.svg",
  Bangladesh:
    "https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg",
  Barbados:
    "https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Barbados.svg",
  Belarus:
    "https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg",
  Belgium:
    "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg",
  Belize:
    "https://upload.wikimedia.org/wikipedia/commons/e/e7/Flag_of_Belize.svg",
  Benin:
    "https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Benin.svg",
  Bhutan:
    "https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg",
  Bolivia:
    "https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_Bolivia.svg",
  "Bosnia and Herzegovina":
    "https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg",
  Botswana:
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Botswana.svg",
  Brazil: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
  Brunei:
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Brunei.svg",
  Bulgaria:
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg",
  "Burkina Faso":
    "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Burkina_Faso.svg",
  Burundi:
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg",
  "Cabo Verde":
    "https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg",
  Cambodia:
    "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg",
  Cameroon:
    "https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg",
  Canada: "https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg",
  "Central African Republic":
    "https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Central_African_Republic.svg",
  Chad: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Flag_of_Chad.svg",
  Chile:
    "https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg",
  China:
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
  Colombia:
    "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg",
  Comoros:
    "https://upload.wikimedia.org/wikipedia/commons/9/94/Flag_of_the_Comoros.svg",
  Congo:
    "https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_the_Republic_of_the_Congo.svg",
  "Costa Rica":
    "https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Costa_Rica.svg",
  Croatia:
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",
  Cuba: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Cuba.svg",
  Cyprus:
    "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Cyprus.svg",
  "Czech Republic":
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg",
  Denmark:
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg",
  Djibouti:
    "https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_Djibouti.svg",
  Dominica:
    "https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Dominica.svg",
  "Dominican Republic":
    "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Dominican_Republic.svg",
  Ecuador:
    "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
  Egypt:
    "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
  "El Salvador":
    "https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_El_Salvador.svg",
  "Equatorial Guinea":
    "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Equatorial_Guinea.svg",
  Eritrea:
    "https://upload.wikimedia.org/wikipedia/commons/2/29/Flag_of_Eritrea.svg",
  Estonia:
    "https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg",
  Eswatini:
    "https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_Eswatini.svg",
  Ethiopia:
    "https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg",
  Fiji: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg",
  Finland:
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg",
  France: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
  Gabon:
    "https://upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Gabon.svg",
  Gambia:
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_The_Gambia.svg",
  Georgia:
    "https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg",
  Germany: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
  Ghana:
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg",
  Greece:
    "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg",
  Grenada:
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Grenada.svg",
  Guatemala:
    "https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg",
  Guinea:
    "https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Guinea.svg",
  "Guinea-Bissau":
    "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Guinea-Bissau.svg",
  Guyana:
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_Guyana.svg",
  Haiti:
    "https://upload.wikimedia.org/wikipedia/commons/5/5d/Flag_of_Haiti.svg",
  Honduras:
    "https://upload.wikimedia.org/wikipedia/commons/8/82/Flag_of_Honduras.svg",
  Hungary:
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Hungary.svg",
  Iceland:
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Iceland.svg",
  India: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
  Indonesia:
    "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg",
  Iran: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Flag_of_Iran.svg",
  Iraq: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Iraq.svg",
  Ireland: "https://upload.wikimedia.org/wikipedia/en/4/45/Flag_of_Ireland.svg",
  Israel: "https://upload.wikimedia.org/wikipedia/en/d/d3/Flag_of_Israel.svg",
  Italy: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
  Jamaica:
    "https://upload.wikimedia.org/wikipedia/commons/0/0c/Flag_of_Jamaica.svg",
  Japan: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
  Jordan:
    "https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Jordan.svg",
  Kazakhstan:
    "https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg",
  Kenya:
    "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg",
  Kiribati:
    "https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Kiribati.svg",
  "Korea, North":
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_North_Korea.svg",
  "Korea, South":
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_South_Korea.svg",
  Kosovo:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_Kosovo.svg",
  Kuwait:
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Kuwait.svg",
  Kyrgyzstan:
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Kyrgyzstan.svg",
  Laos: "https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Laos.svg",
  Latvia:
    "https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg",
  Lebanon:
    "https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg",
  Lesotho:
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Lesotho.svg",
  Liberia:
    "https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg",
  Libya:
    "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Libya.svg",
  Liechtenstein:
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Liechtenstein.svg",
  Lithuania:
    "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg",
  Luxembourg:
    "https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg",
  Madagascar:
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/Flag_of_Madagascar.svg",
  Malawi:
    "https://upload.wikimedia.org/wikipedia/commons/2/2d/Flag_of_Malawi.svg",
  Malaysia:
    "https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg",
  Maldives:
    "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Maldives.svg",
  Mali: "https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg",
  Malta:
    "https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Malta.svg",
  "Marshall Islands":
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_the_Marshall_Islands.svg",
  Mauritania:
    "https://upload.wikimedia.org/wikipedia/commons/4/43/Flag_of_Mauritania.svg",
  Mauritius:
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Mauritius.svg",
  Mexico: "https://upload.wikimedia.org/wikipedia/en/f/fc/Flag_of_Mexico.svg",
  Micronesia:
    "https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Federated_States_of_Micronesia.svg",
  Moldova:
    "https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Moldova.svg",
  Monaco:
    "https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Monaco.svg",
  Mongolia:
    "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Mongolia.svg",
  Montenegro:
    "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
  Morocco:
    "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",
  Mozambique:
    "https://upload.wikimedia.org/wikipedia/commons/8/8a/Flag_of_Mozambique.svg",
  Myanmar:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Flag_of_Myanmar.svg",
  Namibia:
    "https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Namibia.svg",
  Nauru:
    "https://upload.wikimedia.org/wikipedia/commons/3/30/Flag_of_Nauru.svg",
  Nepal:
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Nepal.svg",
  Netherlands:
    "https://upload.wikimedia.org/wikipedia/en/2/20/Flag_of_the_Netherlands.svg",
  "New Zealand":
    "https://upload.wikimedia.org/wikipedia/en/3/3d/Flag_of_New_Zealand.svg",
  Nicaragua:
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Nicaragua.svg",
  Niger:
    "https://upload.wikimedia.org/wikipedia/commons/f/f4/Flag_of_Niger.svg",
  Nigeria:
    "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
  "North Macedonia":
    "https://upload.wikimedia.org/wikipedia/commons/f/f4/Flag_of_North_Macedonia.svg",
  Norway:
    "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg",
  Oman: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Oman.svg",
  Pakistan:
    "https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg",
  Palau:
    "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Palau.svg",
  Palestine:
    "https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg",
  Panama:
    "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_Panama.svg",
  "Papua New Guinea":
    "https://upload.wikimedia.org/wikipedia/commons/7/7e/Flag_of_Papua_New_Guinea.svg",
  Paraguay:
    "https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg",
  Peru: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg",
  Philippines:
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg",
  Poland: "https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg",
  Portugal:
    "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg",
  Qatar:
    "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg",
  Romania:
    "https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg",
  Russia: "https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg",
  Rwanda:
    "https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg",
  "Saint Kitts and Nevis":
    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Saint_Kitts_and_Nevis.svg",
  "Saint Lucia":
    "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Saint_Lucia.svg",
  "Saint Vincent and the Grenadines":
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Saint_Vincent_and_the_Grenadines.svg",
  Samoa:
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Samoa.svg",
  "San Marino":
    "https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_San_Marino.svg",
  "Sao Tome and Principe":
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Sao_Tome_and_Principe.svg",
  "Saudi Arabia":
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/Flag_of_Saudi_Arabia.svg",
  Senegal:
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg",
  Serbia:
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Serbia.svg",
  Seychelles:
    "https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Seychelles.svg",
  "Sierra Leone":
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Sierra_Leone.svg",
  Singapore:
    "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg",
  Slovakia:
    "https://upload.wikimedia.org/wikipedia/commons/8/8c/Flag_of_Slovakia.svg",
  Slovenia:
    "https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg",
  "Solomon Islands":
    "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_the_Solomon_Islands.svg",
  Somalia:
    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg",
  "South Africa":
    "https://upload.wikimedia.org/wikipedia/commons/7/7f/Flag_of_South_Africa.svg",
  "South Sudan":
    "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_South_Sudan.svg",
  Spain: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg",
  "Sri Lanka":
    "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg",
  Sudan:
    "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Sudan.svg",
  Suriname:
    "https://upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Suriname.svg",
  Sweden: "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg",
  Switzerland:
    "https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Switzerland.svg",
  Syria:
    "https://upload.wikimedia.org/wikipedia/commons/5/53/Flag_of_Syria.svg",
  Taiwan:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Flag_of_Taiwan.svg",
  Tajikistan:
    "https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Tajikistan.svg",
  Tanzania:
    "https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg",
  Thailand:
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",
  "Timor-Leste":
    "https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Timor-Leste.svg",
  Turkey:
    "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
  Turkmenistan:
    "https://upload.wikimedia.org/wikipedia/commons/1/1c/Flag_of_Turkmenistan.svg",
  Tuvalu:
    "https://upload.wikimedia.org/wikipedia/commons/1/14/Flag_of_Tuvalu.svg",
  Uganda:
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Uganda.svg",
  Ukraine: "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Ukraine.svg",
  "United Arab Emirates":
    "https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_the_United_Arab_Emirates.svg",
  "United Kingdom":
    "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_Kingdom.svg",
  "United States":
    "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  Uruguay:
    "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg",
  Uzbekistan:
    "https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg",
  Vanuatu:
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Flag_of_Vanuatu.svg",
  "Vatican City":
    "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vatican_City.svg",
  Venezuela:
    "https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_Venezuela.svg",
  Vietnam:
    "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
  Yemen:
    "https://upload.wikimedia.org/wikipedia/commons/8/8e/Flag_of_Yemen.svg",
  Zambia:
    "https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Zambia.svg",
  Zimbabwe:
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg",
};

export const findCountryFlagByName = (country: string) => {
  if (Object.keys(flags).indexOf(country) == -1) {
    return NoFlag;
  }

  return flags[country];
};
