<template>
    <div class="cv">
        <div class="main-content">
            <template
                v-for="(content, key) in data.content"
            >
                <template
                v-if="content.type === 'header'"
                >
                <cv-header
                    :key="`content-${key}`"
                    :data="content.data"
                />    
                </template>
                <template
                v-else-if="content.type === 'contact-block'"
                >
                <about
                    :key="`content-${key}`"
                    :data="content.data"
                />
                </template>
                <div class="container content" :key="`content-${key}`" v-else>
                <h2 v-if="content.title">{{ content.title }}</h2>
                <div
                    v-for="(subContent, subContentIndex) in content.content"
                    :class="subContent.avoidPageBreak ? 'avoid-page-break' : ''"
                    :key="`subContent-${subContentIndex}`"
                >
                    <div
                    v-if="subContent.type === 'text-block'"
                    v-html="subContent.data"
                    >
                    </div>

                    <div
                    v-if="subContent.type === 'small-title-and-text'"
                    class="small-title-and-text"
                    >
                    <strong>{{ subContent.data.title }}:</strong><br/>
                    {{ subContent.data.text }}
                    </div>

                    <ul
                    class="ul-history"
                    v-if="subContent.type === 'history'"
                    >
                    <li
                        v-for="(history, index) in subContent.data"
                        :key="`history-${index}`"
                        class="item">
                        <job :data="history" />
                    </li>
                    </ul>

                    <ul
                    class="ul-courses"
                    v-if="subContent.type === 'courses'"
                    >
                    <li
                        v-for="(course, index) in subContent.data"
                        :key="`course-${index}`"
                        class="item">
                        <course :data="course" />
                    </li>
                    </ul>

                    <ul
                    class="ul-nodelists"
                    v-if="subContent.type === 'nodelist'"
                    >
                    <li
                        v-for="(node, key) in subContent.data"
                        :key="`node-${key}`"
                        class="item">
                        <div class="box">{{ node }}</div>
                    </li>
                    </ul>
                </div>
                </div>
            </template>
        </div>
        <footer class="footer" v-if="data.footer.linkedin || data.footer.lastUpdate">
            <div class="container">
                <template v-if="data.footer.linkedin">Veja mais no meu LinkedIn: <a :href="data.footer.linkedin">{{ data.footer.linkedin }}</a><br/></template>
                <template v-if="data.footer.lastUpdate">Última atualização em {{ data.footer.lastUpdate }}.</template>
            </div>
        </footer>
    </div>
</template>

<script>
import cvHeader from './header';
import about from './about';
import course from './course';
import job from './job';

export default {
    name: "CV",
    props: {
        data: {
            type: Object,
            required: true
        },
    },
    components: {
        'cv-header': cvHeader,
        about,
        course,
        job
    },
};
</script>