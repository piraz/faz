import {assign, StacheElement, type} from "can";
import $ from "jquery";

export default class FazPagination extends StacheElement {
    static view =`
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                {{# for(page of pagesInCurrentBlock) }}
                <li class="page-item{{#if(isCurrentPage(page)}}  active{{/if}}"><a class="page-link" href="#">{{ page }}{{#if(isCurrentPage(page)}}   <span class="sr-only">(current)</span>{{/if}}</a></li>
                {{/ for }}
              </ul>
            </nav>`;

    static get props() {
        return {
            isLoading: {type: Boolean, default: true},
            currentPage: {type: type.convert(Number), default: 1},
            pagesPerBlock: {type: type.convert(Number), default: 10},
            records: {type: type.convert(Number), default: 0},
            recordsPerPage: {type: type.convert(Number), default: 10},
            start: {type: type.convert(Number), default: 1},
            end: {type: type.convert(Number), default: 1},
            get pages() {
                if (this.records == 0) {
                    return 1;
                }
                return Math.floor((this.records/this.recordsPerPage) +
                    ((this.records % this.recordsPerPage) > 0 ? 1 : 0));
            },
            get currentPageComputed() {
                if (this.pages < this.currentPage ||
                    this.currentPage == 0) {
                    return this.pages;
                }
                return this.currentPage;
            },
            get recordsInLastPage() {
                let lastPageRemainder = this.records % this.recordsPerPage;
                return Math.floor(lastPageRemainder > 0 ? lastPageRemainder :
                    this.recordsPerPage);
            },
            get blocks() {
                return Math.floor((this.pages / this.pagesPerBlock) +
                    this.pages % this.pagesPerBlock > 0 ? 1 : 0);
            },
            get pagesInLastBlock() {
                if (this.pages < this.pagesPerBlock) {
                    return this.pages;
                }
                let lastBlockRemainder = this.pages % this.pagesPerBlock;
                return Math.floor(lastBlockRemainder > 0 ? lastBlockRemainder :
                    this.pagesPerBlock);
            },
            get currentFirstRegister() {
                return (this.currentPageComputed * this.recordsPerPage) -
                    this.recordsPerPage + 1;
            },
            get currentLastRegister() {
                if (this.currentPageComputed == this.pages) {
                    return this.currentFirstRegister +
                        this.recordsInLastPage - 1;
                }
                return this.currentPageComputed * this.recordsPerPage;
            },
            get currentBlock() {
                if (this.currentPageComputed <= this.pagesPerBlock) {
                    return 1;
                }
                return Math.floor(
                    (this.currentPageComputed / this.pagesPerBlock) +
                    this.currentPageComputed / this.pagesPerBlock > 0 ? 1 : 0
                );
            },
            get currentFirstPage() {
                return (this.currentBlock * this.pagesPerBlock) -
                    this.pagesPerBlock + 1;
            },
            get currentLastPage() {
                if (this.currentBlock == this.blocks) {
                    return this.currentFirstPage + this.pagesInLastBlock - 1;
                }
                return this.currentBlock * this.pagesPerBlock;
            },
            get pagesInCurrentBlock() {
                let pagesInCurrentBlock = this.currentBlock == this.blocks ?
                    this.pagesInLastBlock : this.pagesPerBlock;
                return Array(pagesInCurrentBlock).fill(undefined).map(
                    (n, i) => i + this.currentFirstPage);
            },
            isCurrentPage: function(page) {
                return page == this.currentPageComputed;
            }
        };
    }


    connectedCallback() {
        let attributes = {};
        for(let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "currentpage":
                    attributes["currentPage"] = attribute.value;
                case "pagesperblock":
                    attributes["pagesPerBlock"] = attribute.value;
                default:
                    attributes[attribute.name.toLowerCase()] = attribute.value;
                    break;
            }
        }
        console.log(attributes);
        console.log(this);
        assign(this, attributes);
        super.connectedCallback();
    }

    static get seal() {
        return true;
    }
}

customElements.define("faz-pagination", FazPagination);
