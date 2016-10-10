'use strict'
/* global describe, it, jsPDF, comparePdf */
/**
 * Standard spec tests
 *
 * These tests return the datauristring so that reference files can be generated.
 * We compare the exact output.
 */

describe('Acrobat Reader Bugs', () => {
  xit('should render valid PNG', () => {

    var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX/TQBcNTh/AAAAAXRSTlPM0jRW/QAAAApJREFUeJxjYgAAAAYAAzY3fKgAAAAASUVORK5CYII=';
    var doc = new jsPDF()
    doc.addImage(imgData, 'PNG', 15, 40, 500, 500)
    comparePdf(doc.output(), 'broken-png.pdf', 'readers')
  })

  it('should render transparent PNG', () => {
  	document.body.innerHTML = `<img src="/base/tests/readers/input/dice.png" class="img">`;
  	setTimeout(function() {
	    var doc = new jsPDF()
	    doc.text('Hey', 100, 100)
	    doc.setFillColor(222, 0, 70)
	    doc.rect(0, 0, 40, 40, 'F')
	    doc.setFillColor(0, 222, 70)
	    doc.rect(40, 0, 40, 40, 'F')
	    doc.setFillColor(70, 0, 222)
	    doc.rect(40, 40, 40, 40, 'F')
	    doc.setFillColor(120, 2, 70)
	    doc.rect(0, 40, 40, 40, 'F')
	    doc.addImage(document.querySelector('.img'), 'PNG', 0, 0, 80, 80)

	    doc.output('dataurlnewwindow')
  	})

    //comparePdf(doc.output(), 'png.pdf', 'readers')

  })
})
