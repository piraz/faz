import {assign, StacheElement, type} from "can";

import paginationTemplate from "./stache/pagination.stache";

export default class FazPagination extends StacheElement {
    static view = paginationTemplate;

    static get props() {
        return {
            currentPage: {type: type.convert(Number), default: 1},
            pagesPerBlock: {type: type.convert(Number), default: 10},
            records: {type: type.convert(Number), default: 0},
            recordsPerPage: {type: type.convert(Number), default: 10},
            debug : {type: type.convert(Boolean), default: false},
            get pages() {
                if (this.records == 0) {
                    return 1;
                }
                let pagesFloor = Math.floor(this.records/this.recordsPerPage);
                let remainder = this.records % this.recordsPerPage;
                let addRemainder = remainder > 0 ? 1 : 0;
                return pagesFloor + addRemainder;
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
                return lastPageRemainder > 0 ? lastPageRemainder :
                    this.recordsPerPage;
            },
            get blocks() {
                let blocksFloor = Math.floor(this.pages / this.pagesPerBlock);
                let addReminder = this.pages % this.pagesPerBlock > 0 ? 1 : 0;
                return blocksFloor + addReminder;
            },
            get pagesInLastBlock() {
                if (this.pages < this.pagesPerBlock) {
                    return this.pages;
                }
                let lastBlockRemainder = this.pages % this.pagesPerBlock;
                return lastBlockRemainder > 0 ? lastBlockRemainder :
                    this.pagesPerBlock;
            },
            get currentFirstRecord() {
                return (this.currentPageComputed * this.recordsPerPage) -
                    this.recordsPerPage + 1;
            },
            get currentLastRecord() {
                if (this.currentPageComputed == this.pages) {
                    return this.currentFirstRecord +
                        this.recordsInLastPage - 1;
                }
                return this.currentPageComputed * this.recordsPerPage;
            },
            get currentBlock() {
                if (this.currentPageComputed <= this.pagesPerBlock) {
                    return 1;
                }
                let currentBlockFloor = Math.floor(
                    this.currentPageComputed / this.pagesPerBlock);
                let remainder = this.currentPageComputed % this.pagesPerBlock;
                let addRemainder = remainder > 0 ? 1 : 0;
                return currentBlockFloor + addRemainder;
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
                case "debug":
                    attributes["debug"] = attribute.value;
                    break;
                case "currentpage":
                    attributes["currentPage"] = attribute.value;
                    break;
                case "pagesperblock":
                    attributes["pagesPerBlock"] = attribute.value;
                    break;
                case "records":
                    attributes["records"] = attribute.value;
                    break;
            }
        }
        assign(this, attributes);
        super.connectedCallback();
    }



    static get seal() {
        return true;
    }
}

customElements.define("faz-pagination", FazPagination);
