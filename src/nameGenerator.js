const nm1 = ["A", "E", "I", "O", "U", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const nm1Len = nm1.length;

const nm2 = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z", "br", "cr", "dr", "gr", "kr", "pr", "sr", "tr", "str", "vr", "zr", "bl", "cl", "fl", "gl", "kl", "pl", "sl", "vl", "zl", "ch", "sh", "ph", "th"];
const nm2Cap = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z", "Br", "Cr", "Dr", "Gr", "Kr", "Pr", "Sr", "Tr", "Str", "Vr", "Zr", "Bl", "Cl", "Fl", "Gl", "Kl", "Pl", "Sl", "Vl", "Zl", "Ch", "Sh", "Ph", "Th"];
const nm2Len = nm2.length;

const nm3 = ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "ae", "ai", "ao", "au", "aa", "ea", "ei", "eo", "eu", "ee", "ia", "io", "iu", "oa", "oi", "oo", "ua", "ue"];
const nm3Len = nm3.length;

const nm4 = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z", "br", "cr", "dr", "gr", "kr", "pr", "sr", "tr", "str", "vr", "zr", "bl", "cl", "fl", "hl", "gl", "kl", "ml", "nl", "pl", "sl", "tl", "vl", "zl", "ch", "sh", "ph", "th", "bd", "cd", "gd", "kd", "ld", "md", "nd", "pd", "rd", "sd", "zd", "bs", "cs", "ds", "gs", "ks", "ls", "ms", "ns", "ps", "rs", "ts", "ct", "gt", "lt", "nt", "st", "rt", "zt", "bb", "cc", "dd", "gg", "kk", "ll", "mm", "nn", "pp", "rr", "ss", "tt", "zz"];
const nm4Len = nm4.length;

const nm5 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "b", "c", "d", "f", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "x", "y", "b", "c", "d", "f", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "x", "y", "cs", "ks", "ls", "ms", "ns", "ps", "rs", "ts", "ys", "ct", "ft", "kt", "lt", "nt", "ph", "sh", "th"]
const nm5Len = nm5.length;

const LIMIT = 40540500; // nmN.length mutiplied with each other after "", "", ..., "" reduced to one ""

function nameGen() {
  rnd = Math.floor(Math.random() * nm1Len);
  rnd2 = Math.floor(Math.random() * nm2Len);
  rnd3 = Math.floor(Math.random() * nm3Len);
  rnd4 = Math.floor(Math.random() * nm4Len);
  rnd5 = Math.floor(Math.random() * nm3Len);
  if (rnd3 > 14) {
    while (rnd5 > 14) {
      rnd5 = Math.floor(Math.random() * nm3Len);
    }
  }
  rnd6 = Math.floor(Math.random() * nm5Len);

  return nm1[rnd] + (rnd > 4 ? nm2Cap[rnd2] : nm2[rnd2]) + nm3[rnd3] + nm4[rnd4] + nm3[rnd5] + nm5[rnd6]; 
}

const seen = new Set();

const generateUniqueName = () => {
  let result;
  do {
    result = nameGen();
  } while (seen.has(result));

  seen.add(result);

  if (seen.size >= LIMIT) throw "Limit exceeded";

  return result;
}