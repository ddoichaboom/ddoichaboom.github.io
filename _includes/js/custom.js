/*
  한국어 검색 보정
  lunr 2.3.9의 기본 trimmer는 ASCII 기준 비단어 문자를 단어 앞뒤에서 깎는데, 한글도 비단어 문자로 보기 때문에
  한글 단어가 빈 문자열로 색인되어 한국어 검색 결과가 나오지 않는다.
  유니코드 기준으로 문자 · 숫자와 _ + # 만 남기도록 바꾼다. (+ # 을 남겨 "C++" 제목도 검색되게 한다.)
  테마의 assets/js/just-the-docs.js 끝에서 포함되며, 색인은 그 뒤 검색 데이터를 받은 다음에 만들어진다.
*/
if (typeof lunr !== 'undefined') {
  lunr.trimmer = function (token) {
    return token.update(function (s) {
      return s.replace(/^[^\p{L}\p{N}_+#]+/u, '').replace(/[^\p{L}\p{N}_+#]+$/u, '');
    });
  };
  lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer-unicode');
}
