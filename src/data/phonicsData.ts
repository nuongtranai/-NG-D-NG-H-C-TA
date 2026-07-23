import { IPAItem } from '../types';

export const PHONICS_DATA: IPAItem[] = [
  // --- SHORT VOWELS ---
  {
    id: 'ae',
    symbol: '/æ/',
    category: 'short_vowels',
    categoryNameVi: 'Nguyên âm ngắn 🍎',
    exampleWord: 'Cat',
    wordIPA: '/kæt/',
    wordMeaning: 'Con mèo 🐱',
    emoji: '🐱',
    mouthGuideVi: 'Mở miệng rộng như khi nói âm "A" tiếng Việt, nhưng hạ cằm sâu hơn và đẩy lưỡi thấp xuống đáy miệng.',
    lipTipVi: 'Môi kéo rộng sang hai bên, lưỡi chạm nhẹ vào răng dưới.',
    practiceSentence: 'A fat cat sat on a mat.',
    sampleWords: [
      { word: 'Cat', ipa: '/kæt/', meaning: 'Con mèo 🐱', emoji: '🐱' },
      { word: 'Apple', ipa: '/ˈæp.əl/', meaning: 'Quả táo 🍎', emoji: '🍎' },
      { word: 'Hat', ipa: '/hæt/', meaning: 'Cái mũ 👒', emoji: '👒' },
      { word: 'Bag', ipa: '/bæɡ/', meaning: 'Cặp sách 🎒', emoji: '🎒' }
    ]
  },
  {
    id: 'e',
    symbol: '/e/',
    category: 'short_vowels',
    categoryNameVi: 'Nguyên âm ngắn 🍎',
    exampleWord: 'Bed',
    wordIPA: '/bed/',
    wordMeaning: 'Cái giường 🛌',
    emoji: '🛌',
    mouthGuideVi: 'Miệng mở vừa phải (hẹp hơn âm /æ/), lưỡi đặt nhẹ ở giữa miệng và phát âm "E" ngắn gọn.',
    lipTipVi: 'Môi thả lỏng, không kéo rộng quá mức.',
    practiceSentence: 'Ten red pens on the bed.',
    sampleWords: [
      { word: 'Bed', ipa: '/bed/', meaning: 'Cái giường 🛌', emoji: '🛌' },
      { word: 'Pen', ipa: '/pen/', meaning: 'Cái bút 🖊️', emoji: '🖊️' },
      { word: 'Egg', ipa: '/eɡ/', meaning: 'Quả trứng 🥚', emoji: '🥚' },
      { word: 'Red', ipa: '/red/', meaning: 'Màu đỏ 🔴', emoji: '🔴' }
    ]
  },
  {
    id: 'i_short',
    symbol: '/ɪ/',
    category: 'short_vowels',
    categoryNameVi: 'Nguyên âm ngắn 🍎',
    exampleWord: 'Fish',
    wordIPA: '/fɪʃ/',
    wordMeaning: 'Con cá 🐟',
    emoji: '🐟',
    mouthGuideVi: 'Đọc giống âm "I" tiếng Việt nhưng phát âm thật ngắn, nhanh và dứt khoát. Thả lỏng cơ miệng.',
    lipTipVi: 'Khóe miệng mở nhẹ sang hai bên.',
    practiceSentence: 'A big fish swims in the river.',
    sampleWords: [
      { word: 'Fish', ipa: '/fɪʃ/', meaning: 'Con cá 🐟', emoji: '🐟' },
      { word: 'Milk', ipa: '/mɪlk/', meaning: 'Sữa tươi 🥛', emoji: '🥛' },
      { word: 'Pig', ipa: '/pɪɡ/', meaning: 'Con heo 🐖', emoji: '🐖' },
      { word: 'Ship', ipa: '/ʃɪp/', meaning: 'Con tàu 🚢', emoji: '🚢' }
    ]
  },
  {
    id: 'o_short',
    symbol: '/ɒ/',
    category: 'short_vowels',
    categoryNameVi: 'Nguyên âm ngắn 🍎',
    exampleWord: 'Dog',
    wordIPA: '/dɒɡ/',
    wordMeaning: 'Con chó 🐶',
    emoji: '🐶',
    mouthGuideVi: 'Mở rộng miệng tròn thành hình chữ O, lưỡi hạ thấp ở phía sau miệng. Âm ngắn gọn dứt khoát.',
    lipTipVi: 'Môi tròn nhẹ, không nhô ra quá nhiều.',
    practiceSentence: 'A hot dog on a box.',
    sampleWords: [
      { word: 'Dog', ipa: '/dɒɡ/', meaning: 'Con chó 🐶', emoji: '🐶' },
      { word: 'Box', ipa: '/bɒks/', meaning: 'Cái hộp 📦', emoji: '📦' },
      { word: 'Clock', ipa: '/klɒk/', meaning: 'Đồng hồ ⏰', emoji: '⏰' },
      { word: 'Frog', ipa: '/frɒɡ/', meaning: 'Con ếch 🐸', emoji: '🐸' }
    ]
  },
  {
    id: 'u_short',
    symbol: '/ʌ/',
    category: 'short_vowels',
    categoryNameVi: 'Nguyên âm ngắn 🍎',
    exampleWord: 'Bus',
    wordIPA: '/bʌs/',
    wordMeaning: 'Xe buýt 🚌',
    emoji: '🚌',
    mouthGuideVi: 'Phát âm tương tự âm "Ă" hoặc "Ăn" trong tiếng Việt. Miệng mở nhẹ, lưỡi hơi nâng lên một chút.',
    lipTipVi: 'Môi hoàn toàn thả lỏng tự nhiên.',
    practiceSentence: 'Run under the sunny sun.',
    sampleWords: [
      { word: 'Bus', ipa: '/bʌs/', meaning: 'Xe buýt 🚌', emoji: '🚌' },
      { word: 'Sun', ipa: '/sʌn/', meaning: 'Mặt trời ☀️', emoji: '☀️' },
      { word: 'Duck', ipa: '/dʌk/', meaning: 'Con vịt 🦆', emoji: '🦆' },
      { word: 'Cup', ipa: '/kʌp/', meaning: 'Cái cốc 🥛', emoji: '🥛' }
    ]
  },
  {
    id: 'uu_short',
    symbol: '/ʊ/',
    category: 'short_vowels',
    categoryNameVi: 'Nguyên âm ngắn 🍎',
    exampleWord: 'Book',
    wordIPA: '/bʊk/',
    wordMeaning: 'Quyển sách 📚',
    emoji: '📚',
    mouthGuideVi: 'Môi hơi tròn nhô ra một chút, phát âm ngắn tựa như âm "U" nhè nhẹ dứt khoát.',
    lipTipVi: 'Không mím chặt môi, lưỡi lùi nhẹ về sau.',
    practiceSentence: 'Look at the good book.',
    sampleWords: [
      { word: 'Book', ipa: '/bʊk/', meaning: 'Quyển sách 📚', emoji: '📚' },
      { word: 'Look', ipa: '/lʊk/', meaning: 'Nhìn xem 👀', emoji: '👀' },
      { word: 'Foot', ipa: '/fʊt/', meaning: 'Bàn chân 🦶', emoji: '🦶' },
      { word: 'Cook', ipa: '/kʊk/', meaning: 'Nấu ăn 🧑‍🍳', emoji: '🧑‍🍳' }
    ]
  },

  // --- LONG VOWELS ---
  {
    id: 'i_long',
    symbol: '/iː/',
    category: 'long_vowels',
    categoryNameVi: 'Nguyên âm dài ⭐️',
    exampleWord: 'Sheep',
    wordIPA: '/ʃiːp/',
    wordMeaning: 'Con cừu 🐑',
    emoji: '🐑',
    mouthGuideVi: 'Mỉm cười thật tươi! Kéo dài khóe miệng sang hai bên và ngân dài âm "I" khoảng 1 giây.',
    lipTipVi: 'Môi căng như đang cười chụp ảnh 😄.',
    practiceSentence: 'I see three green trees.',
    sampleWords: [
      { word: 'Sheep', ipa: '/ʃiːp/', meaning: 'Con cừu 🐑', emoji: '🐑' },
      { word: 'Tree', ipa: '/triː/', meaning: 'Cái cây 🌳', emoji: '🌳' },
      { word: 'Bee', ipa: '/biː/', meaning: 'Con ong 🐝', emoji: '🐝' },
      { word: 'Tea', ipa: '/tiː/', meaning: 'Tách trà 🍵', emoji: '🍵' }
    ]
  },
  {
    id: 'a_long',
    symbol: '/ɑː/',
    category: 'long_vowels',
    categoryNameVi: 'Nguyên âm dài ⭐️',
    exampleWord: 'Car',
    wordIPA: '/kɑːr/',
    wordMeaning: 'Xe ô tô 🚗',
    emoji: '🚗',
    mouthGuideVi: 'Mở rộng miệng như khi bác sĩ bảo "Nói AAA đi con!". Đặt lưỡi thấp xuống đáy miệng và ngân dài.',
    lipTipVi: 'Miệng tròn mở rộng thả lỏng thoải mái.',
    practiceSentence: 'Park the car in the dark star park.',
    sampleWords: [
      { word: 'Car', ipa: '/kɑːr/', meaning: 'Xe ô tô 🚗', emoji: '🚗' },
      { word: 'Star', ipa: '/stɑːr/', meaning: 'Ngôi sao ⭐️', emoji: '⭐️' },
      { word: 'Park', ipa: '/pɑːrk/', meaning: 'Công viên 🏞️', emoji: '🏞️' },
      { word: 'Heart', ipa: '/hɑːrt/', meaning: 'Trái tim 💖', emoji: '💖' }
    ]
  },
  {
    id: 'o_long',
    symbol: '/ɔː/',
    category: 'long_vowels',
    categoryNameVi: 'Nguyên âm dài ⭐️',
    exampleWord: 'Ball',
    wordIPA: '/bɔːl/',
    wordMeaning: 'Quả bóng ⚽️',
    emoji: '⚽️',
    mouthGuideVi: 'Tròn môi giống như chữ O, ngân dài âm "O" sâu trong cổ họng.',
    lipTipVi: 'Môi chúm tròn nhô về phía trước.',
    practiceSentence: 'Paul plays with a small ball.',
    sampleWords: [
      { word: 'Ball', ipa: '/bɔːl/', meaning: 'Quả bóng ⚽️', emoji: '⚽️' },
      { word: 'Door', ipa: '/dɔːr/', meaning: 'Cánh cửa 🚪', emoji: '🚪' },
      { word: 'Horse', ipa: '/hɔːrs/', meaning: 'Con ngựa 🐎', emoji: '🐎' },
      { word: 'Water', ipa: '/ˈwɔː.tər/', meaning: 'Nước uống 💧', emoji: '💧' }
    ]
  },
  {
    id: 'u_long',
    symbol: '/uː/',
    category: 'long_vowels',
    categoryNameVi: 'Nguyên âm dài ⭐️',
    exampleWord: 'Moon',
    wordIPA: '/muːn/',
    wordMeaning: 'Mặt trăng 🌙',
    emoji: '🌙',
    mouthGuideVi: 'Chúm môi lại nhỏ như chiếc ống hút, phát âm "U" kéo dài và tròn môi.',
    lipTipVi: 'Môi nhô nhọn ra phía trước.',
    practiceSentence: 'Fly to the blue moon in June.',
    sampleWords: [
      { word: 'Moon', ipa: '/muːn/', meaning: 'Mặt trăng 🌙', emoji: '🌙' },
      { word: 'Blue', ipa: '/bluː/', meaning: 'Màu xanh 💙', emoji: '💙' },
      { word: 'Shoe', ipa: '/ʃuː/', meaning: 'Chiếc giày 👟', emoji: '👟' },
      { word: 'Zoo', ipa: '/zuː/', meaning: 'Sở thú 🦁', emoji: '🦁' }
    ]
  },

  // --- DIPHTHONGS ---
  {
    id: 'ei',
    symbol: '/eɪ/',
    category: 'diphthongs',
    categoryNameVi: 'Nguyên âm đôi 🚀',
    exampleWord: 'Cake',
    wordIPA: '/keɪk/',
    wordMeaning: 'Bánh ngọt 🎂',
    emoji: '🎂',
    mouthGuideVi: 'Bắt đầu từ âm /e/ (miệng mở vừa phải) trượt mượt mà sang âm /ɪ/ (mỉm cười nhẹ).',
    lipTipVi: 'Chuyển động môi từ rộng sang hơi khép.',
    practiceSentence: 'Make a cake on a rainy day.',
    sampleWords: [
      { word: 'Cake', ipa: '/keɪk/', meaning: 'Bánh ngọt 🎂', emoji: '🎂' },
      { word: 'Rain', ipa: '/reɪn/', meaning: 'Cơn mưa 🌧️', emoji: '🌧️' },
      { word: 'Train', ipa: '/treɪn/', meaning: 'Tàu hỏa 🚂', emoji: '🚂' },
      { word: 'Plane', ipa: '/pleɪn/', meaning: 'Máy bay ✈️', emoji: '✈️' }
    ]
  },
  {
    id: 'ai',
    symbol: '/aɪ/',
    category: 'diphthongs',
    categoryNameVi: 'Nguyên âm đôi 🚀',
    exampleWord: 'Kite',
    wordIPA: '/kaɪt/',
    wordMeaning: 'Con diều 🪁',
    emoji: '🪁',
    mouthGuideVi: 'Bắt đầu từ âm /a/ (miệng mở to) rồi lướt nhẹ sang âm /ɪ/ (khóe miệng kéo sang hai bên).',
    lipTipVi: 'Phát âm tựa như từ "Ai" trong tiếng Việt nhưng tự nhiên hơn.',
    practiceSentence: 'I fly a white kite in the sky.',
    sampleWords: [
      { word: 'Kite', ipa: '/kaɪt/', meaning: 'Con diều 🪁', emoji: '🪁' },
      { word: 'Fly', ipa: '/flaɪ/', meaning: 'Bay cao 🦅', emoji: '🦅' },
      { word: 'Ice', ipa: '/aɪs/', meaning: 'Đá lạnh 🧊', emoji: '🧊' },
      { word: 'Smile', ipa: '/smaɪl/', meaning: 'Nụ cười 😊', emoji: '😊' }
    ]
  },
  {
    id: 'oi',
    symbol: '/ɔɪ/',
    category: 'diphthongs',
    categoryNameVi: 'Nguyên âm đôi 🚀',
    exampleWord: 'Boy',
    wordIPA: '/bɔɪ/',
    wordMeaning: 'Cậu bé 👦',
    emoji: '👦',
    mouthGuideVi: 'Khởi đầu với môi tròn /ɔ/ rồi trượt thật nhanh sang mỉm cười /ɪ/.',
    lipTipVi: 'Phát âm tương tự âm "Oi" trong tiếng Việt.',
    practiceSentence: 'The happy boy has a fun toy.',
    sampleWords: [
      { word: 'Boy', ipa: '/bɔɪ/', meaning: 'Cậu bé 👦', emoji: '👦' },
      { word: 'Toy', ipa: '/tɔɪ/', meaning: 'Đồ chơi 🧸', emoji: '🧸' },
      { word: 'Coin', ipa: '/kɔɪn/', meaning: 'Đồng xu 🪙', emoji: '🪙' },
      { word: 'Joy', ipa: '/dʒɔɪ/', meaning: 'Niềm vui 🎉', emoji: '🎉' }
    ]
  },

  // --- CONSONANTS ---
  {
    id: 'p_sound',
    symbol: '/p/',
    category: 'consonants_unvoiced',
    categoryNameVi: 'Phụ âm bật hơi 💨',
    exampleWord: 'Pen',
    wordIPA: '/pen/',
    wordMeaning: 'Cái bút 🖊️',
    emoji: '🖊️',
    mouthGuideVi: 'Mím chặt hai môi lại, tích luồng khí rồi bật thật mạnh ra! Đây là âm vô thanh (không rung dây thanh quản).',
    lipTipVi: 'Thử đặt tờ giấy trước miệng, phát âm /p/ làm tờ giấy bay nhẹ!',
    practiceSentence: 'Peter picked a purple pen.',
    sampleWords: [
      { word: 'Pen', ipa: '/pen/', meaning: 'Cái bút 🖊️', emoji: '🖊️' },
      { word: 'Pig', ipa: '/pɪɡ/', meaning: 'Con heo 🐖', emoji: '🐖' },
      { word: 'Panda', ipa: '/ˈpæn.də/', meaning: 'Gấu trúc 🐼', emoji: '🐼' },
      { word: 'Pink', ipa: '/pɪŋk/', meaning: 'Màu hồng 🩷', emoji: '🩷' }
    ]
  },
  {
    id: 'b_sound',
    symbol: '/b/',
    category: 'consonants_voiced',
    categoryNameVi: 'Phụ âm rung dây thanh 🔔',
    exampleWord: 'Ball',
    wordIPA: '/bɔːl/',
    wordMeaning: 'Quả bóng 🏀',
    emoji: '🏀',
    mouthGuideVi: 'Mím hai môi giống âm /p/, nhưng phát ra tiếng rung cổ họng (hữu thanh). Cổ họng sẽ rung nhẹ khi chạm tay vào.',
    lipTipVi: 'Mím môi rồi bật âm "Bờ" tròn trịa.',
    practiceSentence: 'A big blue bear plays with a ball.',
    sampleWords: [
      { word: 'Ball', ipa: '/bɔːl/', meaning: 'Quả bóng 🏀', emoji: '🏀' },
      { word: 'Bear', ipa: '/beər/', meaning: 'Con gấu 🐻', emoji: '🐻' },
      { word: 'Bus', ipa: '/bʌs/', meaning: 'Xe buýt 🚌', emoji: '🚌' },
      { word: 'Banana', ipa: '/bəˈnɑː.nə/', meaning: 'Quả chuối 🍌', emoji: '🍌' }
    ]
  },
  {
    id: 't_sound',
    symbol: '/t/',
    category: 'consonants_unvoiced',
    categoryNameVi: 'Phụ âm bật hơi 💨',
    exampleWord: 'Tiger',
    wordIPA: '/ˈtaɪ.ɡər/',
    wordMeaning: 'Con hổ 🐯',
    emoji: '🐯',
    mouthGuideVi: 'Đặt đầu lưỡi vào vòm lợi đằng sau răng cửa trên, nén hơi rồi bật luồng gió ra thật giòn.',
    lipTipVi: 'Răng khép nhẹ, luồng hơi bật ra dứt khoát.',
    practiceSentence: 'Two tigers take tea together.',
    sampleWords: [
      { word: 'Tiger', ipa: '/ˈtaɪ.ɡər/', meaning: 'Con hổ 🐯', emoji: '🐯' },
      { word: 'Toy', ipa: '/tɔɪ/', meaning: 'Đồ chơi 🧸', emoji: '🧸' },
      { word: 'Train', ipa: '/treɪn/', meaning: 'Tàu hỏa 🚂', emoji: '🚂' },
      { word: 'Turtle', ipa: '/ˈtɜː.təl/', meaning: 'Con rùa 🐢', emoji: '🐢' }
    ]
  },
  {
    id: 'd_sound',
    symbol: '/d/',
    category: 'consonants_voiced',
    categoryNameVi: 'Phụ âm rung dây thanh 🔔',
    exampleWord: 'Duck',
    wordIPA: '/dʌk/',
    wordMeaning: 'Con vịt 🦆',
    emoji: '🦆',
    mouthGuideVi: 'Khẩu hình giống âm /t/ nhưng rung dây thanh quản trong cổ họng tạo nên âm "Đờ" vang nhẹ.',
    lipTipVi: 'Đặt ngón tay vào cổ họng để cảm nhận độ rung nhẹ.',
    practiceSentence: 'A dog and a duck dance together.',
    sampleWords: [
      { word: 'Duck', ipa: '/dʌk/', meaning: 'Con vịt 🦆', emoji: '🦆' },
      { word: 'Dog', ipa: '/dɒɡ/', meaning: 'Con chó 🐶', emoji: '🐶' },
      { word: 'Door', ipa: '/dɔːr/', meaning: 'Cánh cửa 🚪', emoji: '🚪' },
      { word: 'Dolphin', ipa: '/ˈdɒl.fɪn/', meaning: 'Cá thần tài 🐬', emoji: '🐬' }
    ]
  },
  {
    id: 'f_sound',
    symbol: '/f/',
    category: 'consonants_unvoiced',
    categoryNameVi: 'Phụ âm bật hơi 💨',
    exampleWord: 'Frog',
    wordIPA: '/frɒɡ/',
    wordMeaning: 'Con ếch 🐸',
    emoji: '🐸',
    mouthGuideVi: 'Chạm nhẹ răng cửa trên vào môi dưới, thổi luồng hơi nhẹ nhàng lách qua khe răng.',
    lipTipVi: 'Thổi hơi tạo tiếng "Phừ" xì xào vui tai.',
    practiceSentence: 'Four funny frogs fly high.',
    sampleWords: [
      { word: 'Frog', ipa: '/frɒɡ/', meaning: 'Con ếch 🐸', emoji: '🐸' },
      { word: 'Fish', ipa: '/fɪʃ/', meaning: 'Con cá 🐟', emoji: '🐟' },
      { word: 'Fox', ipa: '/fɒks/', meaning: 'Con cáo 🦊', emoji: '🦊' },
      { word: 'Flower', ipa: '/ˈflaʊ.ər/', meaning: 'Bông hoa 🌸', emoji: '🌸' }
    ]
  },
  {
    id: 'sh_sound',
    symbol: '/ʃ/',
    category: 'consonants_unvoiced',
    categoryNameVi: 'Phụ âm bật hơi 💨',
    exampleWord: 'Ship',
    wordIPA: '/ʃɪp/',
    wordMeaning: 'Con tàu 🚢',
    emoji: '🚢',
    mouthGuideVi: 'Chu môi tròn ra phía trước như cử chỉ ra hiệu "Trật tự nào! Shhh...!", đẩy luồng hơi mạnh.',
    lipTipVi: 'Môi nhô ra, hai răng hơi khép lại.',
    practiceSentence: 'She shines shiny shoes on the ship.',
    sampleWords: [
      { word: 'Ship', ipa: '/ʃɪp/', meaning: 'Con tàu 🚢', emoji: '🚢' },
      { word: 'Shark', ipa: '/ʃɑːrk/', meaning: 'Cá mập 🦈', emoji: '🦈' },
      { word: 'Shoe', ipa: '/ʃuː/', meaning: 'Chiếc giày 👟', emoji: '👟' },
      { word: 'Sheep', ipa: '/ʃiːp/', meaning: 'Con cừu 🐑', emoji: '🐑' }
    ]
  }
];

export const MOCK_LEADERBOARD = [
  { id: '1', name: 'Gấu Trúc Minh Anh 🐼', avatar: '🐼', xpToday: 320, totalStars: 48, streak: 7, rankBadge: '👑 Hạng 1' },
  { id: '2', name: 'Sư Tử Bảo Nam 🦁', avatar: '🦁', xpToday: 280, totalStars: 42, streak: 5, rankBadge: '🥈 Hạng 2' },
  { id: '3', name: 'Thỏ Ngọc Khánh Vy 🐰', avatar: '🐰', xpToday: 240, totalStars: 38, streak: 6, rankBadge: '🥉 Hạng 3' },
  { id: '4', name: 'Khủng Long Gia Hùng 🦖', avatar: '🦖', xpToday: 190, totalStars: 31, streak: 4 },
  { id: '5', name: 'Mèo Béo Chí Kiên 🐱', avatar: '🐱', xpToday: 150, totalStars: 25, streak: 3 },
  { id: '6', name: 'Cáo Nhỏ Phương Thảo 🦊', avatar: '🦊', xpToday: 110, totalStars: 19, streak: 2 }
];

export const AVATAR_OPTIONS = [
  { id: 'panda', emoji: '🐼', name: 'Gấu Trúc 🐼' },
  { id: 'lion', emoji: '🦁', name: 'Sư Tử 🦁' },
  { id: 'bunny', emoji: '🐰', name: 'Thỏ Ngọc 🐰' },
  { id: 'dino', emoji: '🦖', name: 'Khủng Long 🦖' },
  { id: 'astrocat', emoji: '🐱', name: 'Mèo Vũ Trụ 🐱' },
  { id: 'unicorn', emoji: '🦄', name: 'Kỳ Lân 🦄' },
  { id: 'fox', emoji: '🦊', name: 'Cáo Thông Thái 🦊' },
  { id: 'doggy', emoji: '🐶', name: 'Chú Chó Dũng Cảm 🐶' }
];
