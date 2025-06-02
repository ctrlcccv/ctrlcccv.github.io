---
title: >  
    React props: 컴포넌트 간 데이터 전달, 활용, 최적화

description: >  
    React에서 props는 데이터를 부모 컴포넌트에서 자식 컴포넌트로 효과적으로 전달하여 코드 재사용성을 높이고 개발 효율성을 극대화합니다. 이 글은 React props의 활용 방법과 최적화에 대해 다룹니다.

slug: 2024-03-14-react-props
date: 2024-03-14 00:00:00+0000
lastmod: 2024-03-14 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-14-react-props.webp

categories:
    - React
tags:
    - React 기초
    - 컴포넌트
    - 데이터 전달

---
리액트에서 컴포넌트는 코드 재사용성을 높여 개발 효율성을 극대화하는 핵심 요소입니다. 그러나 컴포넌트 간에 데이터를 전달해야 할 때 어려움이 발생할 수 있습니다. 이러한 문제를 해결하기 위해 리액트는 props라는 개념을 도입하여 부모 컴포넌트에서 자식 컴포넌트로 데이터를 효과적으로 전달할 수 있게 합니다. 이 글에서는 props를 심층적으로 이해하고, 다양한 활용 방법 및 최적화에 대해 알아보겠습니다.  



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

## props 정의 및 역할
`props`는 **Properties**의 약자로, **부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 데 사용되는 객체**입니다. 컴포넌트 간에 직접적인 데이터 공유가 불가능하므로 props는 컴포넌트 간의 데이터 흐름을 구현하는 필수적인 역할을 합니다.

<br>

## props 전달 방법

**함수 컴포넌트**   
함수 컴포넌트에서는 props를 함수의 인자로 전달합니다.

```javascript
const UserCard = ({ userName, userAge }) => {
    return (
        <div>
            <h1>{userName}</h1>
            <p>나이는 {userAge}살입니다.</p>
        
    );
};

const App = () => {
    return (
        <div>
            <UserCard userName="홍길동" userAge={20} />
        
    );
};
```

**클래스 컴포넌트**   
클래스 컴포넌트에서는 `this.props` 객체를 통해 props에 접근할 수 있습니다.

```javascript
class UserCard extends React.Component {
    render() {
        const { userName, userAge } = this.props;
        return (
            <div>
                <h1>{userName}</h1>
                <p>나이는 {userAge}살입니다.</p>
            
        );
    }
}

const App = () => {
    return (
        <div>
            <UserCard userName="이순신" userAge={30} />
        
    );
};
```



<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


## props의 다양한 데이터 유형

props는 문자열, 숫자, 객체, 배열 등 다양한 기본 자료형뿐 아니라 함수, 컴포넌트, 심지어 객체의 콜백 함수까지 전달할 수 있습니다.

```javascript
const UserCard = ({
    userName,
    userAge,
    userHobbies,
    renderProfileButton,
    CustomComponent,
    handleProfileClick,
}) => {
    return (
        <div>
            <h1>{userName}</h1>
            <p>나이는 {userAge}살입니다.</p>
            <ul>
                {userHobbies.map((hobby) => (
                    <li key={hobby}>{hobby}</li>
                ))}
            </ul>
            {renderProfileButton && (
                <button onClick={handleProfileClick}>프로필 보기</button>
            )}
            {CustomComponent && <CustomComponent />}
        
    );
};

const App = () => {
    const userHobbies = ["독서", "영화 감상", "여행"];
    const handleProfileClick = () => {
        alert("프로필을 확인합니다.");
    };
    return (
        <div>
            <UserCard
                userName="김유신"
                userAge={40}
                userHobbies={userHobbies}
                renderProfileButton={true}
                handleProfileClick={handleProfileClick}
                CustomComponent={() => <p>추가 정보입니다.</p>}
            />
        
    );
};
```
<br>

## props 활용 팁 

**`React.cloneElement` 함수를 사용하여 props 동적 변경**  
```javascript
const CounterApp = () => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    };

    return (
        <div>
            <CounterDisplay counter={counter} />
            <button onClick={handleClick}>카운터 증가</button>
        
    );
};

const CounterDisplay = ({ counter }) => {
    return (
        <div>
            <h1>카운터: {counter}</h1>
        
    );
};

const EnhancedCounterDisplay = () => {
    const props = {
        counter: 100, // props를 동적으로 변경
    };

    return React.cloneElement(<CounterDisplay />, props);
};

const EnhancedCounterApp = () => {
    return (
        <div>
            <EnhancedCounterDisplay />
        
    );
};
```

**`PropTypes` 라이브러리를 사용하여 props 유형 검증**  

```javascript
import PropTypes from "prop-types";

const UserCard = ({ userName, userAge }) => {
    return (
        <div>
            <h1>{userName}</h1>
            <p>나이는 {userAge}살입니다.</p>
        
    );
};

UserCard.propTypes = {
    userName: PropTypes.string.isRequired, // userName prop은 필수이며 문자열이어야 합니다.
    userAge: PropTypes.number, // userAge prop은 숫자형이어야 합니다.
};

const App = () => {
    return (
        <div>
            <UserCard userName="홍길동" userAge={20} /> // 유효한 props
            <UserCard userAge={20} /> // ❌ 오류 발생: userName prop이 누락되었습니다.
            <UserCard userName="이순신" userAge="30" /> // ❌ 오류 발생: userAge prop은 숫자형이어야 합니다.
        
    );
};
```

**전달된 props를 래핑하여 재사용**  

```javascript
const withAdditionalProps = (Component) => {
    return (props) => {
        const additionalProps = {
            // 추가적인 props를 정의
            extraProp: "Hello, world!",
        };

        return <Component {...props} {...additionalProps} />;
    };
};

const UserCard = ({ userName, userAge, extraProp }) => {
    return (
        <div>
            <h1>{userName}</h1>
            <p>나이는 {userAge}살입니다.</p>
            <p>추가 prop: {extraProp}</p>
        
    );
};

const EnhancedComponent = withAdditionalProps(UserCard);

const App = () => {
    return (
        <div>
            <EnhancedComponent userName="김유신" userAge={40} />
        
    );
};
```

**`children` prop을 사용하여 자식 컴포넌트 내용 접근**  

```javascript
const Wrapper = ({ content }) => {
    return (
        <div>
            {content}
        
    );
};

const App = () => {
    return (
        <div>
            <Wrapper>
                <h1>안녕하세요</h1>
                <p>리액트 props에 대한 블로그 글입니다.</p>
            </Wrapper>
        
    );
};
```

**함수형 컴포넌트의 `useMemo` hook을 사용하여 props 최적화**  

```javascript
const DataDisplay = ({ items }) => {
    const processedItems = useMemo(() => {
        // 데이터를 처리하는 비용이 많이 드는 작업
        return items.map((item) => item.toUpperCase());
    }, [items]);

    return (
        <div>
            {processedItems.map((item) => (
                <p key={item}>{item}</p>
            ))}
        
    );
};
```

**커스텀 Hook을 사용하여 props 재사용성 향상**  

```javascript
const UserData = (names) => {
    const processedNames = useMemo(() => {
        // 데이터를 처리하는 비용이 많이 드는 작업
        return names.map((name) => name.toUpperCase());
    }, [names]);

    return {
        processedNames,
    };
};

const UserList = () => {
    const { processedNames } = UserData([
        "홍길동",
        "이순신",
        "김유신",
    ]);

    return (
        <div>
            {processedNames.map((name) => (
                <p key={name}>{name}</p>
            ))}
        
    );
};

const App = () => {
    return (
        <div>
            <UserList />
        
    );
};
```
<br>

## props 활용 시 주의 사항

* **props는 불변(immutable)해야 합니다.**   
자식 컴포넌트에서 props를 수정하면 예상치 못한 동작이 발생할 수 있습니다.

* **props는 최대한 간결하게 유지해야 합니다.**   
불필요한 데이터를 props로 전달하면 컴포넌트 간의 결합도를 높이고 유지 관리를 어렵게 만듭니다.

* **props는 명확한 의미가 있는 이름을 사용해야 합니다.**   
props 이름을 명확하게 지으면 코드를 이해하고 유지 관리하는 데 도움이 됩니다.

<br>

## 결론  
리액트 props는 컴포넌트 간에 데이터를 전달하는 중요한 개념입니다. props를 올바르게 사용하면 코드 재사용성을 높이고 컴포넌트 관리를 효율적으로 할 수 있습니다.  
