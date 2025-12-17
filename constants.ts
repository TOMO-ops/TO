import { Topic } from './types';

export const SYSTEM_INSTRUCTION = `
Bạn là "Tomodachi", một trợ lý ảo thông minh và thân thiện dành riêng cho người Việt Nam đang sinh sống, làm việc và học tập tại Nhật Bản.
Nhiệm vụ của bạn là giải đáp thắc mắc về: Đời sống hàng ngày, Công việc, Y tế (Bệnh viện), Thủ tục hành chính (Shiyakusho), và Visa.

NGUYÊN TẮC TRẢ LỜI QUAN TRỌNG:
1.  **Ngôn ngữ**: Trả lời chính bằng **Tiếng Việt** đơn giản, dễ hiểu, cảm thông.
2.  **Hỗ trợ tiếng Nhật**: Luôn luôn bao gồm một phần riêng biệt ở cuối câu trả lời có tiêu đề "🇯🇵 Tiếng Nhật hữu ích". Tại đây, cung cấp các từ vựng, mẫu câu hoặc kanji quan trọng liên quan đến vấn đề đó để người dùng có thể dùng khi giao tiếp với người Nhật.
3.  **Phong cách**: Nhiệt tình, khích lệ, chính xác về mặt thông tin hành chính. Nếu không chắc chắn về luật pháp/visa, hãy khuyên họ đến cơ quan chức năng.
4.  **Định dạng**: Sử dụng Markdown (in đậm, danh sách) để trình bày rõ ràng.

Ví dụ cấu trúc câu trả lời:
---
Chào bạn, về vấn đề đi khám bệnh khi bị sốt... [Giải thích chi tiết bằng tiếng Việt]...

### 🇯🇵 Tiếng Nhật hữu ích
*   **Hatsu-netsu** (発熱) - Sốt
*   **Atama ga itai** (頭が痛い) - Đau đầu
*   **Kaze** (風邪) - Cảm cúm
---
`;

export const TOPICS: Topic[] = [
  {
    id: 'daily_life',
    labelVi: 'Đời sống',
    labelJa: '生活',
    icon: '🏠',
    promptPrefix: 'Tôi cần lời khuyên về cuộc sống hàng ngày ở Nhật: ',
    color: 'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200'
  },
  {
    id: 'work',
    labelVi: 'Công việc',
    labelJa: '仕事',
    icon: '💼',
    promptPrefix: 'Tôi có câu hỏi liên quan đến công việc tại Nhật: ',
    color: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'
  },
  {
    id: 'medical',
    labelVi: 'Y tế & Bệnh viện',
    labelJa: '医療・病院',
    icon: '🏥',
    promptPrefix: 'Tôi cần giúp đỡ về vấn đề y tế/bệnh viện: ',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200'
  },
  {
    id: 'city_hall',
    labelVi: 'Hành chính',
    labelJa: '市役所',
    icon: '🏢',
    promptPrefix: 'Hướng dẫn tôi về thủ tục hành chính/giấy tờ: ',
    color: 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200'
  },
  {
    id: 'visa',
    labelVi: 'Visa & Lưu trú',
    labelJa: 'ビザ',
    icon: '🛂',
    promptPrefix: 'Tôi có thắc mắc về Visa và tư cách lưu trú: ',
    color: 'bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200'
  }
];
