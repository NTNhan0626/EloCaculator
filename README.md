# EloCaculator
# task1 (research)
- định nghĩa:
strict mode là một tính năng trong JavaScript được giới thiệu từ ECMAScript 5 (ES5), nhằm giúp phát hiện sớm các lỗi tiềm ẩn và cải thiện hiệu năng của mã. Khi bật strict mode, JavaScript sẽ áp dụng các quy tắc nghiêm ngặt hơn trong việc biên dịch và thực thi mã.
- cách khai báo:
'use strict'; dùng cho toàn bộ file hoặc function.
hoặc chỉ dùng cho hàm cụ thể
function myFunction() {
  'use strict';
}
- công dụng:
Giúp tránh các lỗi thường gặp trong JavaScript.
Cải thiện hiệu năng vì các trình thông dịch có thể tối ưu tốt hơn.
Ngăn ngừa việc tạo ra các biến global không mong muốn.
Bảo vệ từ việc ghi đè các thuộc tính, biến không nên thay đổi.

# task2 (elo caculator)
# Xây dựng data
Đầu tiên xây dựng lớp player gồm các thông tin như id, name, elo, match:
Mach ở đây là danh sách các trận đấu của player
Xây dựng lớp Match gồm các thuộc tính như id, kill, deadth, support, time, dame, gold, result, stat, elochange, totalEloGap.
trong lớp match xây dựng hàm tính stat cho trận đấu của player từ c đến s+ theo 1 chỉ số điểm được tính bằng cách cộng 3 tham số gồm kda,gpm,dpm trong đó kda được tính bằng (kill+support)/dead, gpm (gold per minute) sẽ dao động từ 50-800 vàng mỗi phút nên công thức tính sẽ là gold/1000*10 sẽ dao động từ 0.5-8 điểm tùy trận tương tự cho dame cũng sẽ dao động từ 0-9đ tùy trận, tổng số điểm sẽ quyết định stat của người chơi tùy theo vai trò top, mid, jg, ad, sp yêu cầu điểm để đạt s+ cao nhất sẽ là ad > mid = top > jg > sp trung bình stat người chơi đạt được sẽ nằm trong khoảng b đến a+ sẽ nhiều nhất 70-80%. totalEloGap được tính bằng tổng elo team địch trừ tổng elo team mình, sẽ mang giá trị dương (team địch dự đoán mạnh hơn team mình khi thắng sẽ + nhiều elo hơn) ngược lại mang giá trị âm (team địch được đánh giá yếu hơn nếu thắng + ít elo hơn, thua thì bị trừ nhiều elo hơn).
# Tính toán elo sau mỗi trận.
Ban đầu mỗi player mặc định có 1000 điểm elo. Cách tính elo của player sẽ được tính theo từng trận cách tính sẽ là thắng +20 điểm thua -15 điểm, tùy theo stat của người chơi cũng sẽ có chêch lệch nếu trận thắng thì stat c và c+ không được cộng điểm, b +2 điểm và tăng dần cao nhất s+ +7 điểm, nếu thua thì stat từ b vẫn được cộng điểm như thắng để những người thể hiện tốt trong trận không bị giảm quá nhiều elo, còn c bị trừ thêm 3 điểm và c+ thì trừ thêm 2 điểm. Yếu tố tác động elo tiếp theo là chuỗi thắng hoặc thua, nếu chuỗi thắng thì cộng thêm elo tương ứng với độ dài chuỗi tối da +10 và thua cũng tương tự tối đa -10 yếu tố này giúp người chơi nhanh về đúng với mức rank của mình sau mỗi mùa reset rank và đưa những người chơi kĩ năng chưa đủ xuống rank và elo của họ. Cuối cùng là độ chênh lệch tổng elo giữa 2 team, điểm sẽ được tính bằng totalEloGap/50 chỉ số này giúp người chơi được + nhiều elo hơn khi gặp team mạnh và bị trừ nhiều hơn nếu thua team yếu. Tóm lại elo sau mỗi trận sẽ thay đổi bằng tổng của 4 yếu tố gồm: thắng/thua, stat, chuỗi thắng/thua và tổng chênh lệch elo giữa 2 team.
# UI hiển thị
Gồm 3 trang chính:
Trang hiển thị top 10 player có elo dẫn đầu sau tính toán.
Trang hiển thị thông tin tất cả player.
Trang hiển thị chi tiết player, trang này sẽ hiển thị danh sách trận dấu của player và chi tiết chỉ số của mỗi trận như kda, kills, deadth, support, gold, dame, time, stat, eloChange.

