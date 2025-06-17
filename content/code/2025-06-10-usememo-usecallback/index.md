---
title: >  
    React useMemo vs useCallback 차이점 쉽게 이해하기

description: >  
    React의 성능 최적화를 위한 useMemo와 useCallback 훅의 차이점과 활용법을 실제 예제와 함께 비교 분석합니다.

slug: 2025-06-10-usememo-usecallback
date: 2025-06-10 00:00:00+0000
lastmod: 2025-06-12 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-10-usememo-usecallback.webp

canonical: "https://ctrlcccv.github.io/code/2025-06-10-usememo-usecallback/"
alternates:
  - title: "React useMemo vs useCallback 차이점 쉽게 이해하기"
    href: "https://ctrlcccv.github.io/code/2025-06-10-usememo-usecallback/"
    hreflang: "ko"
  - title: "React useMemo vs useCallback: 5 Key Differences Every Developer Must Know" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-13-usememo-usecallback/"
    hreflang: "en"
    
categories:
    - React
tags:
    - React Hooks
    - 성능 최적화
    - 상태 관리
---

React에서 성능 최적화를 하다 보면 useMemo와 useCallback을 언제 어떻게 써야 할지 헷갈리죠.

저도 처음 이 두 훅을 접했을 때 정말 혼란스러웠어요. 비슷해 보이는 문법에 둘 다 "메모이제이션"이라는 같은 개념을 쓴다고 하니까요. 특히 실제 프로젝트에서 성능 문제가 생겼을 때, "이거 useMemo로 해야 하나? useCallback으로 해야 하나?" 하면서 계속 찾아보곤 했거든요. 심지어 한 번은 useMemo를 써야 할 곳에 useCallback을 써서 오히려 성능이 더 나빠진 경험도 있었어요.

이 글에서는 제가 실제 프로젝트에서 겪었던 시행착오와 함께, 언제 무엇을 써야 하는지 확실하게 알려드릴게요.

**값**을 기억하는 useMemo부터 **함수**를 기억하는 useCallback까지, 실제 코드 예제와 함께 단계별로 설명하겠습니다. 마지막에는 제가 정리한 "상황별 선택 가이드"도 공유해드릴 테니까, 더 이상 헷갈리지 않으실 거예요!

<br>

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


<br>

## 가장 중요한 핵심 차이점 하나만 기억하세요

제가 이 개념을 처음 이해했을 때의 "아하!" 순간을 여러분도 경험하셨으면 좋겠어요.  
실제 프로젝트에서는 이런 상황이 자주 생겨요. 쇼핑몰을 만든다고 가정해 보죠.

```javascript
function ShoppingCart({ products }) {
  // useMemo: 계산 결과를 기억해둬요
  const totalPrice = useMemo(() => {
    console.log('총 가격 계산 중...'); // 이 로그를 주목하세요!
    return products.reduce((sum, product) => sum + product.price, 0);
  }, [products]);

  // useCallback: 함수 자체를 기억해둬요
  const calculateTotal = useCallback(() => {
    console.log('총 가격 계산 중...'); // 이 로그도 주목하세요!
    return products.reduce((sum, product) => sum + product.price, 0);
  }, [products]);

  return (
    <div>
      {/* useMemo: 이미 계산된 값을 바로 보여줘요 */}
      <p>총 가격: {totalPrice}원</p>
      
      {/* useCallback: 버튼을 클릭해야 계산해요 */}
      <button onClick={() => alert(`총 가격: ${calculateTotal()}원`)}>
        가격 확인하기
      </button>
    </div>
  );
}
```

차이점이 느껴지시나요?

- **useMemo**: 컴포넌트가 렌더링될 때 바로 계산하고, 그 **결과값**을 저장해둡니다.
- **useCallback**: **함수 자체**만 저장해두고, 실제로는 나중에 호출될 때 계산합니다.

저는 이걸 "식당의 조리 방식"으로 이해했어요. useMemo는 미리 만들어서 진열해 두는 도시락 같고, useCallback은 주문이 들어와야 조리하는 즉석요리 같은 거죠.

이제 왜 실무에서 둘을 구분해서 써야 하는지 구체적인 상황으로 알아볼까요?

<br>

## 실제 프로젝트에서 마주치는 상황들

### 대용량 데이터 처리할 때의 차이점

제가 관리자 대시보드를 만들 때 겪었던 상황이에요. 10만 개가 넘는 주문 데이터를 필터링해야 했거든요.

```javascript
function OrderDashboard({ orders, selectedDate, selectedStatus }) {
  // ❌ 최적화 전: 렌더링마다 매번 필터링
  const filteredOrders = orders
    .filter(order => order.date === selectedDate)
    .filter(order => order.status === selectedStatus)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // ✅ useMemo로 최적화: 의존성이 바뀔 때만 계산
  const optimizedFilteredOrders = useMemo(() => {
    console.log('주문 데이터 필터링 중...'); // 언제 계산되는지 확인용
    return orders
      .filter(order => order.date === selectedDate)
      .filter(order => order.status === selectedStatus)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [orders, selectedDate, selectedStatus]);

  // 이벤트 핸들러는 useCallback으로
  const handleOrderClick = useCallback((orderId) => {
    console.log(`주문 ${orderId} 클릭됨`);
    // 주문 상세 페이지로 이동하는 로직
  }, []);

  return (
    <div>
      <h2>주문 관리 ({optimizedFilteredOrders.length}건)</h2>
      {optimizedFilteredOrders.map(order => (
        <OrderItem 
          key={order.id} 
          order={order} 
          onClick={handleOrderClick}
        />
      ))}
    </div>
  );
}
```

실제로 테스트해보니까 useMemo를 쓰기 전에는 상태가 바뀔 때마다 300ms 정도 걸렸는데, 최적화 후에는 거의 즉시 반응하더라고요. 특히 사용자가 날짜나 상태를 빠르게 바꿔가며 필터링할 때 차이가 확실히 느껴졌어요.

<br>

### 자식 컴포넌트 리렌더링 방지하기

이건 정말 많이 겪는 상황이에요. React.memo로 감싼 자식 컴포넌트가 계속 리렌더링 되는 문제 말이에요.

```javascript
// 자식 컴포넌트 (React.memo로 최적화)
const ProductCard = React.memo(({ product, onAddToCart, onToggleFavorite }) => {
  console.log(`${product.name} 카드 렌더링`); // 리렌더링 추적용
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price}원</p>
      <button onClick={() => onAddToCart(product.id)}>
        장바구니 담기
      </button>
      <button onClick={() => onToggleFavorite(product.id)}>
        {product.isFavorite ? '♥' : '♡'}
      </button>
    </div>
  );
});

// 부모 컴포넌트
function ProductList({ products, cart, favorites }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // useMemo: 검색 결과를 메모이제이션
  const filteredProducts = useMemo(() => {
    console.log('상품 필터링 중...');
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // useCallback: 이벤트 핸들러들을 메모이제이션
  const handleAddToCart = useCallback((productId) => {
    console.log(`상품 ${productId}를 장바구니에 추가`);
    // 장바구니 추가 로직
  }, []);

  const handleToggleFavorite = useCallback((productId) => {
    console.log(`상품 ${productId} 찜하기 토글`);
    // 찜하기 토글 로직
  }, []);

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="상품 검색..."
      />
      
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
```

이렇게 구성하면 검색어를 바꿔도 실제로 표시되는 상품들만 리렌더링되고, 이벤트 핸들러는 새로 생성되지 않아서 모든 ProductCard가 다시 렌더링 되지 않아요.

이제 어떤 상황에서 뭘 써야 하는지 더 구체적으로 알아볼까요?

<br>

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


<br>

## 상황별 선택 가이드

### useMemo를 써야 하는 확실한 상황들

**1. 계산 비용이 많이 드는 작업**

```javascript
function DataAnalytics({ salesData, period }) {
  // 수십만 건의 매출 데이터 분석
  const analytics = useMemo(() => {
    console.log('매출 분석 계산 중... (시간이 좀 걸려요)');
    
    const filtered = salesData.filter(sale => 
      sale.date >= period.start && sale.date <= period.end
    );
    
    return {
      totalSales: filtered.reduce((sum, sale) => sum + sale.amount, 0),
      averageOrderValue: filtered.length > 0 ? 
        filtered.reduce((sum, sale) => sum + sale.amount, 0) / filtered.length : 0,
      topProducts: filtered
        .reduce((acc, sale) => {
          acc[sale.productId] = (acc[sale.productId] || 0) + sale.amount;
          return acc;
        }, {})
    };
  }, [salesData, period.start, period.end]);

  return (
    <div>
      <h2>매출 분석</h2>
      <p>총 매출: {analytics.totalSales.toLocaleString()}원</p>
      <p>평균 주문금액: {analytics.averageOrderValue.toLocaleString()}원</p>
    </div>
  );
}
```

**2. 자식 컴포넌트에 전달할 객체/배열 생성**

```javascript
function UserProfile({ user, settings }) {
  // 매번 새로운 객체가 생성되는 걸 방지
  const userDisplayInfo = useMemo(() => {
    return {
      name: user.name,
      email: user.email,
      avatar: user.avatar || '/default-avatar.png',
      theme: settings.theme,
      language: settings.language
    };
  }, [user.name, user.email, user.avatar, settings.theme, settings.language]);

  return <UserCard userInfo={userDisplayInfo} />;
}
```

<br>

### useCallback을 써야 하는 확실한 상황들

**1. 자식 컴포넌트에 전달하는 이벤트 핸들러**

```javascript
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // 이벤트 핸들러들을 메모이제이션
  const handleAddTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, { 
        id: Date.now(), 
        text: newTodo, 
        completed: false 
      }]);
      setNewTodo('');
    }
  }, [newTodo]);

  const handleToggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleDeleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <TodoInput 
        value={newTodo}
        onChange={setNewTodo}
        onSubmit={handleAddTodo}
      />
      <TodoList 
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}
```

**2. useEffect의 의존성으로 사용되는 함수**

이건 제가 자주 실수했던 부분이에요. useEffect 의존성에 함수를 넣으면 무한 루프가 생기곤 했거든요.

```javascript
function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // API 호출 함수를 useCallback으로 메모이제이션
  const fetchUserPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getUserPosts(userId);
      setPosts(response.data);
    } catch (error) {
      console.error('포스트 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // useEffect에서 안전하게 사용
  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  // 새로고침 기능도 같은 함수 재사용
  return (
    <div>
      <button onClick={fetchUserPosts} disabled={loading}>
        {loading ? '로딩 중...' : '새로고침'}
      </button>
      {posts.map(post => <PostItem key={post.id} post={post} />)}
    </div>
  );
}
```

혹시 "이거 진짜 최적화가 되는 거야?" 궁금하실까봐, 다음에는 실제 성능 차이를 보여드릴게요!

<br>

## 실제 성능 차이 측정해 보기

여러분도 개발자 도구에서 확인해 보세요!

<br>

### 최적화 전: 매번 계산하는 방식

```javascript
function ProductSearch({ products, category, sortBy }) {
  console.time('상품 처리 시간'); // 성능 측정 시작
  
  // 매번 새로 계산 (약 5,000개 상품 기준)
  const processedProducts = products
    .filter(product => product.category === category)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 20); // 상위 20개만

  console.timeEnd('상품 처리 시간'); // 평균 45ms 소요
  
  return (
    <div>
      {processedProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
```

<br>

### 최적화 후: useMemo 적용

```javascript
function ProductSearch({ products, category, sortBy }) {
  const processedProducts = useMemo(() => {
    console.time('상품 처리 시간');
    
    const result = products
      .filter(product => product.category === category)
      .sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .slice(0, 20);
      
    console.timeEnd('상품 처리 시간');
    return result;
  }, [products, category, sortBy]);
  
  // 의존성이 바뀌지 않으면 이전 결과 재사용 (0ms)
  
  return (
    <div>
      {processedProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**실제 측정 결과:**
- 최적화 전: 매번 45ms 소요 (10번 렌더링 시 450ms)
- 최적화 후: 첫 계산 45ms, 이후 0ms (10번 렌더링 시 45ms)

거의 10배 차이가 나더라고요! 특히 사용자가 필터나 정렬을 빠르게 바꿀 때 체감 성능이 확실히 달라져요.

<br>

## 흔히 하는 실수들

### 실수 1: 과도한 최적화

```javascript
// ❌ 이렇게 하지 마세요 (오히려 성능 저하)
const sum = useMemo(() => a + b, [a, b]); // 단순 계산은 불필요
const greeting = useMemo(() => `안녕하세요, ${name}님!`, [name]); // 문자열 조합도 불필요

// ✅ 이런 경우는 그냥 일반 계산이 더 빨라요
const sum = a + b;
const greeting = `안녕하세요, ${name}님!`;
```

"최적화가 좋은 거니까 모든 곳에 써야지!"라고 생각했는데, 메모이제이션 자체도 비용이 들거든요.

<br>

### 실수 2: 의존성 배열 실수

```javascript
// ❌ 이렇게 하면 버그 발생
const handleSubmit = useCallback(() => {
  submitForm(formData); // formData가 의존성에 없어서 이전 값 사용
}, []); // 의존성 누락!

// ✅ 올바른 사용법
const handleSubmit = useCallback(() => {
  submitForm(formData);
}, [formData]); // 의존성 제대로 포함
```

ESLint의 `exhaustive-deps` 규칙을 켜두시면 이런 실수를 방지할 수 있어요.

<br>

### 실수 3: 객체/배열 의존성 처리 미숙

```javascript
// ❌ 문제가 되는 코드
function UserCard({ user }) {
  const options = { theme: 'dark', showAvatar: true }; // 매번 새 객체
  
  const memoizedData = useMemo(() => {
    return processUserData(user, options);
  }, [user, options]); // options가 매번 새로워서 메모이제이션 무효
}

// ✅ 해결 방법
function UserCard({ user }) {
  const options = useMemo(() => ({
    theme: 'dark',
    showAvatar: true
  }), []); // 옵션도 메모이제이션

  const memoizedData = useMemo(() => {
    return processUserData(user, options);
  }, [user, options]);
}
```

<br>

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


<br>

## 자주 묻는 질문들 

### Q1: "useMemo와 useCallback 중 뭐가 더 중요한가요?"

실무에서는 useCallback을 더 자주 쓰게 되더라고요. 자식 컴포넌트에 함수를 전달하는 경우가 계산 비용이 큰 작업보다 훨씬 많거든요. 하지만 데이터 처리가 복잡한 애플리케이션이라면 useMemo가 더 중요할 수도 있어요.

<br>

### Q2: "의존성 배열이 자주 바뀌면 최적화 의미가 없나요?"

맞아요. 의존성이 자주 바뀌면 메모이제이션 효과가 떨어져요. 하지만 그래도 쓰는 이유는 React.memo와 함께 쓸 때 자식 컴포넌트 리렌더링을 방지할 수 있기 때문이에요.

<br>

### Q3: "언제부터 성능 최적화를 고려해야 하나요?"

다음 상황에서 고려해 보세요.
- 자식 컴포넌트가 React.memo로 감싸져 있을 때
- 계산이 복잡하거나 데이터가 많을 때 (1000개 이상)
- 실제로 성능 문제를 체감할 때

미리 최적화하기보다는 문제가 생겼을 때 적용하는 게 좋아요.

<br>

### Q4: "useCallback 안에서 state를 사용할 때 주의점이 있나요?"

네, 클로저 문제가 있어요.

```javascript
// ❌ 문제: count가 의존성에 없으면 항상 초기값 사용
const increment = useCallback(() => {
  setCount(count + 1); // count가 0일 때의 값으로 고정
}, []); // count 누락

// ✅ 해결 1: 의존성에 포함
const increment = useCallback(() => {
  setCount(count + 1);
}, [count]);

// ✅ 해결 2: 함수형 업데이트 사용 (더 권장)
const increment = useCallback(() => {
  setCount(prev => prev + 1);
}, []);
```

<br>

### Q5: "커스텀 훅에서는 어떻게 써야 하나요?"

커스텀 훅에서는 반환하는 함수를 useCallback으로 감싸주는 게 좋아요:

```javascript
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      setData(await response.json());
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, fetchData };
}
```

이렇게 하면 이 훅을 사용하는 컴포넌트에서 useEffect 의존성으로 안전하게 쓸 수 있어요.

<br>

## 마무리: 핵심만 기억하세요!

1. **useMemo**: **값**이 필요할 때, **계산 비용**이 클 때
2. **useCallback**: **함수**를 전달할 때, **자식 컴포넌트** 최적화할 때
3. **실제 성능 문제**가 있을 때 적용하기 (미리 최적화 금지!)
4. **의존성 배열**을 정확하게 작성하기 (ESLint 도움받기)

이제 한 번 직접 해보세요! 여러분의 프로젝트에서 렌더링이 느린 부분을 찾아서 적절한 훅을 적용해 보시는 거예요. 개발자 도구의 Profiler로 전후 성능을 비교해 보시면 확실한 차이를 느끼실 수 있을 거예요.

여러분은 React 프로젝트에서 이 두 훅을 어떻게 활용하고 계신가요? 혹시 저와 비슷한 실수를 하신 경험이나, 더 좋은 활용법이 있다면 댓글로 공유해주세요! 함께 배워가면서 더 나은 React 개발자가 되어봐요 🚀

<br>
