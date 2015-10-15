JsSpec tries to bring behaviour driven development to JavaScript by somewhat mimicking what rspec does in ruby.

```
with (Spec) {
	describe("A newly created Tic-Tac-Toe", function() { with (this) {
		before("each", function() {
			this.game = new TicTacToe();
		});
		
		it("should have 9 empty cells", function() {
			this.game.cells.should(have(9, "items"));
			this.game.cells.each(function(cell) {
				cell.should( be(undefined) );
			});
		});
		
		it("should have 0 players", function() {
			this.game.should( have(0, "players") );
		});
	}});
}

Specs.run();
```

Real docs coming soon, look at the README file in the downloadable package or the running example in spec/index.html