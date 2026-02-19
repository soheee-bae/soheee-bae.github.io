import React from "react";
import "./index.scss";

const Resume = () => (
  <div className="resume">
    <section className="intro">
      <p className="tagline">
        불확실함을 확신으로, 미국 스타트업 초기 멤버 개발자
      </p>
      <p className="description">
        도전적인 환경에서 비즈니스 임팩트를 만들어내는 5년 차 프론트엔드 개발자
        배소희입니다.
      </p>
    </section>

    <section className="section">
      <h2 className="sectionTitle">About Me</h2>
      <p className="sectionContent">
        5년 차 프론트엔드 개발자로,{" "}
        <strong>미국 시드 단계 스타트업의 초기 멤버</strong>로 활동하며,{" "}
        <strong>주도적인 문제 해결</strong>을 통해 프론트엔드 개발에 대한
        전문성을 쌓았습니다. 오랜 유학 생활을 통해 얻은{" "}
        <strong>유연한 사고와 적응력</strong>을 바탕으로
        <strong>새로운 기술과 낯선 환경에서도 빠르게 성과</strong>를
        만들어왔습니다. 단순히 기능 구현에 그치지 않고,{" "}
        <strong>코드의 재사용성(Reusability)</strong>과{" "}
        <strong>클린 코드(Clean Code)</strong>를 끊임없이 고민하며 유지보수가
        가능한 결과물을 만들어 내려고 노력하고 있습니다. 또한, 다양한 문화권에서
        수많은 사람들과 소통하며 기른 공감 능력은 개발자가 성장하는데 큰 도움이
        되었습니다. 꾸준함의 힘을 믿으며, 팀과 함께 성장하고{" "}
        <strong>비즈니스 임팩트</strong>를 만들어내는 개발자가 되고자 합니다.
      </p>
    </section>

    <section className="section">
      <h2 className="sectionTitle">Contact</h2>
      <ul className="contactList">
        <li>Email | baesohee28@gmail.com</li>
        <li>Phone | 010 9551 7426</li>
        <li>
          Github |{" "}
          <a
            href="https://github.com/soheee-bae"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/soheee-bae
          </a>
        </li>
        <li>
          Blog |{" "}
          <a
            href="https://soheee-bae.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://soheee-bae.github.io/
          </a>
        </li>
        <li>
          Linkedin |{" "}
          <a
            href="https://www.linkedin.com/in/bae-sohee/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.linkedin.com/in/bae-sohee/
          </a>
        </li>
        <li>
          Portfolio |{" "}
          <a
            href="https://soheebae-dev.web.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://soheebae-dev.web.app/
          </a>
        </li>
      </ul>
    </section>

    <section className="section">
      <h2 className="sectionTitle">Experience</h2>
      <div className="experience">
        <div className="experienceItem">
          <h3 className="experienceCompany">Sagetap</h3>
          <p className="experienceRole">
            <strong>Frontend Developer - Founding Member</strong>
          </p>
          <p className="experiencePeriod">2021.05 ~ 2025.11</p>
          <p className="experienceDescription">
            5,000명 이상의 기술 전문가와 B2B SaaS 스타트업이 익명으로 만날 수
            있도록 돕는 온라인 플랫폼 서비스{" "}
          </p>
          <a
            className="experienceDescription"
            href="https://www.sagetap.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.sagetap.io
          </a>

          <div className="experienceAchievements">
            <h4 className="experienceSubtitle">
              플랫폼 V1에서 V2로 새 플랫폼 개발, 마이그레이션 및 업그레이드
            </h4>
            <p className="experienceDescription">
              <strong>
                레거시 개선과 확장성에 초점을 맞춘 플랫폼 전면 개편
              </strong>{" "}
              프로젝트를 <strong>6개월간 7명의 엔지니어 팀과 협업</strong>하여
              성공적으로 런칭했습니다.
            </p>
            <ul className="experienceList">
              <li>
                <strong>Atomic Design</strong> 원칙을 적용한{" "}
                <strong>재사용 가능한 컴포넌트 라이브러리를 구축</strong>하여 UI
                개발 생산성을 높이고 디자인 일관성 확보
              </li>
              <li>
                <strong>기획 단계부터 디자인 팀과 긴밀히 협업</strong>하여 구현
                타당성을 검토하고 모바일 환경에 최적화된 UI 대안 제시로{" "}
                <strong>디자인-개발 사이클 단축</strong>
              </li>
              <li>
                V2 플랫폼 런칭을 통해 스타트업과 전문가 간의{" "}
                <strong>매칭 세션 수 110% 증가 달성</strong>
              </li>
            </ul>

            <h4 className="experienceSubtitle">기존 제품 개선 작업</h4>
            <h5 className="experienceSubtitleSmall">
              모바일 최적화 및 이탈률 감소
            </h5>
            <ul className="experienceList">
              <li>
                플랫폼 전체 <strong>Mobile Optimization을 주도</strong>하며 고정
                픽셀 값을 유동적 단위와 <strong>Tailwind CSS</strong>로 교체하여{" "}
                <strong>크로스 디바이스 대응력 강화</strong>
              </li>
              <li>
                복잡한 모바일 테이블 UI에{" "}
                <strong>Priority Hiding 기법을 제안 및 개발</strong>하여 사용성
                문제 해결
              </li>
              <li>
                <strong>모바일 이탈률 50% 감소 (40% → 20%)</strong> 달성
              </li>
            </ul>

            <h5 className="experienceSubtitleSmall">
              안정화 전략 및 성장 기여
            </h5>
            <ul className="experienceList">
              <li>
                핵심 기능 'Sage Invite' 개발시 복잡한 스펙을{" "}
                <strong>단계별 배포(Phased Rollout)</strong> 전략으로 접근하여
                시스템 안정성을 확보하고,{" "}
                <strong>Unleash를 활용한 Feature Flag를 도입</strong>하여 배포
                리스크를 최소화하며 유연한 릴리즈 환경을 구축
              </li>
              <li>
                <strong>React Hook Form</strong>을 도입하여 폼 성능을 최적화하고
                사용자 경험을 개선한 결과, 해당 기능 개발로{" "}
                <strong>유저 세션 100% 증가 달성</strong>
              </li>
            </ul>

            <h5 className="experienceSubtitleSmall">아키텍처 및 성능 개선</h5>
            <ul className="experienceList">
              <li>
                더 좋은 사용자 경험을 위해 <strong>React-Query</strong>를 활용한
                데이터 <strong>Prefetching 및 캐싱 전략</strong> 도입을 했으며{" "}
                <strong>Skeleton Loader</strong> 작업 제안 및 개발로{" "}
                <strong>체감 로딩 속도 개선</strong>
              </li>
              <li>
                <strong>Debounce 검색</strong> 컴포넌트를 개발하여 불필요한 API
                호출 최소화 및 서버 부하 감소
              </li>
              <li>
                <strong>React Context</strong>와 <strong>next/dynamic</strong>를
                활용하여{" "}
                <strong>견고한 타입 기반 전역 모달 관리 시스템 구축</strong>하고
                번들 사이즈 감축 및 상태 관리를 컴포넌트로부터 분리
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <h2 className="sectionTitle">Projects</h2>
      <div className="projects">
        <div className="projectItem">
          <h3 className="projectName">TastingTable</h3>
          <p className="projectDescription">
            사용자들이 각자 공유하고 싶은 레시피를 사진과 글을 통해 공유하고
            원하는 레시피를 쉽고 편리하게 찾을 수있는 레시피 공유 소셜 네트워크
            서비스
          </p>
          <div className="projectTech">
            <span className="techTag">React</span>
            <span className="techTag">TypeScript</span>
            <span className="techTag">SCSS</span>
            <span className="techTag">NodeJS</span>
            <span className="techTag">Express</span>
            <span className="techTag">Amazon S3</span>
            <span className="techTag">MongoDB</span>
            <span className="techTag">Framer motion</span>
            <span className="techTag">Netlify</span>
          </div>
          <p className="projectMeta">1인 프로젝트 | 2023.03 ~ 2023.04</p>
          <div className="projectLinks">
            <a
              href="https://github.com/soheee-bae/Tasting-Table"
              target="_blank"
              rel="noopener noreferrer"
            >
              👩🏻‍💻 Github
            </a>
            <a
              href="https://tasting-table.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 Demo
            </a>
          </div>
          <p className="projectNote">
            테스트용 아이디 & 비밀번호: tastingtable1@gmail.com / tastingtable1
          </p>
          <ul className="projectAchievements">
            <li>
              <strong>MERN 스택</strong> (Node.js, Express, MongoDB)을 활용하여{" "}
              <strong>기획부터 디자인, API 설계까지</strong> 전체 개발 과정을
              1인 개발로 주도하며, 서비스 구조와 데이터 흐름에 대한 깊은 이해
              확보
            </li>
            <li>
              <strong>Framer Motion</strong>을 활용하여 Drag & Drop 등 부드러운
              인터랙션 애니메이션을 구현하여 <strong>사용자 경험 향상</strong>
            </li>
            <li>
              <strong>Amazon S3</strong>를 연동하여 대용량 이미지 데이터를
              효율적으로 관리하고 <strong>로딩 속도를 최적화</strong>
            </li>
          </ul>
        </div>

        <div className="projectItem">
          <h3 className="projectName">Filmacorn</h3>
          <p className="projectDescription">
            영화를 쉽게 찾아보고 자세한 정보를 제공하며 회원가입과 로그인을
            통해서 원하는 영화 리스트를 보관하고 저장할 수 있는 서비스
          </p>
          <div className="projectTech">
            <span className="techTag">React</span>
            <span className="techTag">TypeScript</span>
            <span className="techTag">SCSS</span>
            <span className="techTag">Next.js</span>
            <span className="techTag">TMDB API</span>
            <span className="techTag">Lazy loading</span>
          </div>
          <p className="projectMeta">1인 프로젝트 | 2023.02 ~ 2023.03</p>
          <div className="projectLinks">
            <a
              href="https://github.com/soheee-bae/Filmacorn"
              target="_blank"
              rel="noopener noreferrer"
            >
              👩🏻‍💻 Github
            </a>
            <a
              href="https://filmacorn.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 Demo
            </a>
          </div>
          <ul className="projectAchievements">
            <li>
              기존 JavaScript 기반의 Next.js 코드를{" "}
              <strong>TypeScript로 전환</strong>하여{" "}
              <strong>타입 안정성을 확보</strong>하고 코드의 유지보수성 강화
            </li>
            <li>
              화면에 필요한 요소만 불러오는{" "}
              <strong>Lazy Loading 기법을 도입</strong>하여{" "}
              <strong>초기 페이지 진입 속도 단축</strong>
            </li>
            <li>
              SCSS의 변수, 중첩, 믹스인 기능을 활용하여{" "}
              <strong>재사용 가능한 스타일 구조</strong>를 설계하고, 정교한 UI
              애니메이션 및 <strong>디자인 시스템을 효율적으로 구현</strong>
            </li>
          </ul>
        </div>

        <div className="projectItem">
          <h3 className="projectName">Gatsby Blog Starter</h3>
          <p className="projectDescription">
            Gatsby를 이용한 개인 블로그 또는 개발 블로그를 운영하고 싶은
            사람들을 대상으로 한 블로그 스타터 탬플릿
          </p>
          <div className="projectTech">
            <span className="techTag">Gatsby</span>
            <span className="techTag">Graphql</span>
            <span className="techTag">React</span>
            <span className="techTag">SCSS</span>
          </div>
          <p className="projectMeta">
            1인 프로젝트 | 2023.01 ~ 2023.02, 2023.03 ~ 2023.04
          </p>
          <div className="projectLinks">
            <div className="projectVersion">
              <span>v1.</span>
              <a
                href="https://github.com/soheee-bae/Gatsby-Clean-Blog-Starter"
                target="_blank"
                rel="noopener noreferrer"
              >
                👩🏻‍💻 Github
              </a>
              <a
                href="https://gatsby-clean-blog-starter.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 Demo
              </a>
            </div>
            <div className="projectVersion">
              <span>v2.</span>
              <a
                href="https://github.com/soheee-bae/Gatsby-Image-Blog-Starter"
                target="_blank"
                rel="noopener noreferrer"
              >
                👩🏻‍💻 Github
              </a>
              <a
                href="https://gatsby-image-blog-starter.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 Demo
              </a>
            </div>
          </div>
          <ul className="projectAchievements">
            <li>
              <strong>Context API와 커스텀 훅을 도입</strong>하여 컴포넌트 간{" "}
              <strong>복잡한 데이터 전달 문제(Props Drilling)</strong>를
              해결하고 상태 관리 구조 개선
            </li>
            <li>
              Jamstackthemes 사이트에 템플릿을 배포하고,{" "}
              <strong>
                실제 사용자 피드백을 반영하여 기능을 개선한 v2 버전 출시
              </strong>
            </li>
            <li>
              <strong>Atomic Design 원칙</strong>을 적용하여 조립과 확장이
              유연한 <strong>반응형 컴포넌트 라이브러리 구축</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="section">
      <h2 className="sectionTitle">Skills</h2>
      <div className="skills">
        <div className="skillCategory">
          <strong>Frontend:</strong> JavaScript, TypeScript, React, Next.js,
          React-Query, Tailwind CSS, Storybook
        </div>
        <div className="skillCategory">
          <strong>Back-end:</strong> Node.js, Express, AWS
        </div>
        <div className="skillCategory">
          <strong>Collaboration:</strong> Git, Jira, Linear
        </div>
      </div>
    </section>

    <section className="section">
      <h2 className="sectionTitle">Education</h2>
      <div className="education">
        <h3 className="educationSchool">University of Alaska Anchorage</h3>
        <p className="educationPeriod">2015.08 ~ 2020.12</p>
        <p className="educationDegree">Bachelor of Science, Computer Science</p>
        <p className="educationGpa">GPA: 3.66 / 4.0 (Cum laude)</p>
      </div>
    </section>

    <section className="section">
      <h2 className="sectionTitle">Languages</h2>
      <ul className="languages">
        <li>
          <strong>English:</strong> Professional Working Proficiency
        </li>
        <li>
          <strong>Korean:</strong> Native
        </li>
      </ul>
    </section>
  </div>
);

export default Resume;
